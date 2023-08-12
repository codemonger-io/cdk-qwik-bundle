import {
  AssetHashType,
  BundlingFileAccess,
  DockerRunOptions
} from 'aws-cdk-lib';

/**
 * Options for bundling.
 *
 * @beta
 */
export interface BundlingOptions extends DockerRunOptions {
  /**
   * Forces bundling in a Docker container.
   *
   * @defaultValue `false`
   */
  readonly forceDockerBundling?: boolean;

  /**
   * Asset hash.
   *
   * @remarks
   *
   * You have to specify
   * {@link https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetHashType.html#custom|AssetHashType.CUSTOM}
   * to {@link BundlingOptions.assetHashType} to use this.
   *
   * @defaultValue `undefined`
   */
  readonly assetHash?: string;

  /**
   * Asset hash type.
   *
   * @remarks
   *
   * You have to specify
   * {@link https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetHashType.html#custom|AssetHashType.CUSTOM}
   * to use {@link BundlingOptions.assetHash}.
   *
   * The default value is
   * {@link https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetHashType.html#output|AssetHashType.SOURCE},
   * because reinstalling dependencies on every build is too expensive.
   *
   * @defaultValue {@link https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetHashType.html#output|AssetHashType.SOURCE}
   */
  readonly assetHashType?: AssetHashType;

  /**
   * File access mode.
   *
   * @remarks
   *
   * The default value is
   * {@link https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.BundlingFileAccess.html#volume_copy|BundlingFileAccess.VOLUME_COPY},
   * because `node_modules` on the local machine could be polluted otherwise.
   *
   * @defaultValue {@link https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.BundlingFileAccess.html#volume_copy|BundlingFileAccess.VOLUME_COPY}
   */
  readonly bundlingFileAccess?: BundlingFileAccess;
}
