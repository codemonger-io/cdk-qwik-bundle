import * as os from 'os';
import * as path from 'path';
import {
  AssetHashType,
  AssetStaging,
  BundlingFileAccess,
  BundlingOptions as CdkBundlingOptions,
  DockerImage,
  DockerRunOptions,
  ILocalBundling,
  aws_lambda as lambda,
} from 'aws-cdk-lib';

import type { BundlingOptions } from './types';
import { exec } from './util';

/**
 * Properties for {@link Bundling}.
 *
 * @beta
 */
export interface BundlingProps extends BundlingOptions {
  /** Path to the folder containing the Qwik app. */
  readonly entry: string;

  /** Runtime of the Lambda function. */
  readonly runtime?: lambda.Runtime;

  /** Architecture of the Lambda function. */
  readonly architecture: lambda.Architecture;
}

/**
 * Bundler for a Qwik app.
 *
 * @beta
 */
export class Bundling implements CdkBundlingOptions {
  /** Bundles a Qwik app. */
  static bundle(options: BundlingProps): lambda.Code {
    return lambda.Code.fromAsset(options.entry, {
      assetHash: options.assetHash,
      assetHashType: options.assetHashType ?? AssetHashType.SOURCE,
      bundling: new Bundling(options),
    });
  }

  /** Docker image to build the Qwik app. */
  public readonly image: DockerImage;
  /** Command to run on the Docker image to build the Qwik app. */
  public readonly command: string[];
  /** Command to build the Qwik app on the local machine. */
  public readonly local: ILocalBundling;
  /** Working directory in the Docker image. */
  public readonly workingDirectory: string;
  /** File access mode. */
  public readonly bundlingFileAccess: BundlingFileAccess;

  constructor(private readonly props: BundlingProps) {
    const shouldBuildImage = props.forceDockerBundling;
    this.image = shouldBuildImage
      ? DockerImage.fromBuild(__dirname, {
        buildArgs: {
          // Qwik requires nodejs 15 or later
          IMAGE: (props.runtime ?? lambda.Runtime.NODEJS_16_X).bundlingImage.image,
        },
        platform: props.architecture.dockerPlatform,
      })
      : DockerImage.fromRegistry('dummy');
    const bundlingCommand = this.createBundlingCommand({
      inputDir: AssetStaging.BUNDLING_INPUT_DIR,
      outputDir: AssetStaging.BUNDLING_OUTPUT_DIR,
      osPlatform: 'linux',
    });
    this.command = ['bash', '-c', bundlingCommand];
    this.workingDirectory = '/';
    this.bundlingFileAccess = props.bundlingFileAccess ?? BundlingFileAccess.VOLUME_COPY;
    if (!props.forceDockerBundling) {
      this.local = this.getLocalBundlingProvider();
    }
  }

  private createBundlingCommand(options: BundlingCommandOptions): string {
    const pathJoin = osPathJoin(options.osPlatform);
    const osCommand = new OsCommand(options.osPlatform);
    const installCommand = ['npm', 'ci'].join(' ');
    const buildCommand = ['npm', 'run', 'build'].join(' ');
    return chain(
      osCommand.changeDirectory(options.inputDir),
      installCommand,
      buildCommand,
      osCommand.copyDirectory('dist', pathJoin(options.outputDir, 'dist')),
      osCommand.copyDirectory('server', pathJoin(options.outputDir, 'server')),
    );
  }

  private getLocalBundlingProvider(): ILocalBundling {
    const osPlatform = os.platform();
    const createLocalCommand = (outputDir: string) =>
      this.createBundlingCommand({
        inputDir: this.props.entry,
        outputDir,
        osPlatform,
      });
    const cwd = this.props.entry;
    return {
      tryBundle(outputDir: string): boolean {
        const localCommand = createLocalCommand(outputDir);
        exec(
          osPlatform === 'win32' ? 'cmd' : 'bash',
          [
            osPlatform === 'win32' ? '/c' : '-c',
            localCommand,
          ],
          {
            stdio: [
              'ignore',
              process.stderr,
              'inherit',
            ],
            cwd,
            windowsVerbatimArguments: osPlatform === 'win32',
          },
        );
        return true;
      },
    };
  }
}

// Options to create a chain of bundling commands.
interface BundlingCommandOptions {
  readonly inputDir: string;
  readonly outputDir: string;
  readonly osPlatform: NodeJS.Platform;
}

// Encapsulates the platform-specific commands.
class OsCommand {
  constructor(private readonly osPlatform: NodeJS.Platform) {}

  changeDirectory(dir: string): string {
    return `cd "${dir}"`;
  }

  copyDirectory(src: string, dest: string): string {
    if (this.osPlatform === 'win32') {
      return `ROBOCOPY "${src}" "${dest}" /E`;
    } else {
      return `cp -r "${src}" "${dest}"`;
    }
  }
}

// returns a platform specific path join function.
function osPathJoin(platform: NodeJS.Platform) {
  return (...paths: string[]) => {
    const joined = path.join(...paths);
    if (os.platform() === 'win32' && platform !== 'win32') {
      return joined.replace(/\\/g, '/');
    }
    return joined;
  };
}

// reutrns a chain of commands.
function chain(...commands: string[]): string {
  return commands.filter(c => !!c).join(' && ');
}
