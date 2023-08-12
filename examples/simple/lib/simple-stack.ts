import * as path from 'path';
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

import { QwikHandler } from 'cdk-qwik-bundle';

export class SimpleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const qwikApp = new QwikHandler(this, 'QwikApp', {
      entry: path.resolve('../qwik-app'),
    });

    const qwikAppIntegration = new HttpLambdaIntegration(
      'QwikAppIntegration',
      qwikApp,
    );
    const api = new HttpApi(this, 'qwik-bundle-example-simple-api', {
      defaultIntegration: qwikAppIntegration,
      description: 'cdk-qwik-bundle example: simple',
    });
    
    new CfnOutput(this, 'HttpApiUrl', {
      description: 'URL of the HTTP API',
      value: api.url!,
    });
  }
}
