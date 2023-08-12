import * as path from 'path';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { Bundling } from './bundling';

/**
 * Constructor parameters for {@link QwikHandler}.
 *
 * @beta
 */
export interface QwikHandlerProps extends lambda.FunctionOptions {
  /** Path to the folder containing the Qwik app. */
  readonly entry: string;

  /**
   * Handler function name.
   *
   * @defaultValue 'server/entry_aws-lambda.qwikApp'
   */
  readonly handler?: string;

  /**
   * Runtime.
   *
   * @defaultValue {@link https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Runtime.html#static-nodejs_18_x|Runtime.NODEJS_18_X}
   */
  readonly runtime?: lambda.Runtime;
}

/**
 * Lambda function that serves a Qwik app.
 *
 * @remarks
 *
 * The Qwik app is supposed to be configured with
 * {@link https://qwik.builder.io/docs/deployments/aws-lambda/|Qwik City AWS Adapter}.
 *
 * @beta
 */
export class QwikHandler extends lambda.Function {
  constructor(scope: Construct, id: string, props: QwikHandlerProps) {
    const entry = path.resolve(props.entry);
    const handler = props.handler ?? 'server/entry_aws-lambda.qwikApp';
    const architecture = props.architecture ?? lambda.Architecture.X86_64;

    super(scope, id, {
      ...props,
      runtime: props.runtime ?? lambda.Runtime.NODEJS_18_X,
      handler,
      code: Bundling.bundle({
        entry,
        runtime: props.runtime,
        architecture,
      }),
    });
  }
}
