import * as path from 'path';
import {
  CfnOutput,
  Duration,
  Fn,
  Stack,
  StackProps,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { QwikHandler } from '@codemonger-io/cdk-qwik-bundle';

export class CloudFrontStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const qwikApp = new QwikHandler(this, 'QwikHandler', {
      entry: path.resolve('../qwik-app'),
      architecture: lambda.Architecture.ARM_64,
      memorySize: 256,
      timeout: Duration.seconds(30),
    });
    const qwikAppUrl = qwikApp.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    const distribution = new cloudfront.Distribution(this, 'QwikDistribution', {
      comment: 'Qwik app distribution (example: cloudfront)',
      defaultBehavior: {
        origin: new origins.HttpOrigin(Fn.parseDomainName(qwikAppUrl.url)),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        cachePolicy: new cloudfront.CachePolicy(this, 'QwikCachePolicy', {
          comment: 'Qwik app cache policy (example: cloudfront)',
          // as Qwik depends a lot on query strings,
          // we have to forward any query strings to the origin
          queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
          // Qwik expects the request to have an X-QRL header
          headerBehavior: cloudfront.CacheHeaderBehavior.allowList('X-QRL'),
          defaultTtl: Duration.seconds(10),
          enableAcceptEncodingGzip: true,
          enableAcceptEncodingBrotli: true,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
      },
    });

    new CfnOutput(this, 'DistributionUrl', {
      description: 'URL of the Qwik app distribution',
      value: `https://${distribution.distributionDomainName}`,
    });
  }
}
