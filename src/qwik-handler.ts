import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Constructor parameters for {@link QwikHandler}.
 *
 * @beta
 */
export interface QwikHandlerProps {
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
