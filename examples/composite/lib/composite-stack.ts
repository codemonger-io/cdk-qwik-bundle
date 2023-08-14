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
  aws_s3 as s3,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { QwikHandler } from 'cdk-qwik-bundle';

export class CompositeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const basepath = '/service/';

    const qwikApp = new QwikHandler(this, 'QwikHandler', {
      entry: path.resolve('../qwik-app'),
      architecture: lambda.Architecture.ARM_64,
      memorySize: 256,
      timeout: Duration.seconds(30),
      bundling: {
        environment: {
          DISTRIBUTION_BASEPATH: basepath,
        },
      },
    });
    const qwikAppUrl = qwikApp.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    const bucket = new s3.Bucket(this, 'ContentsBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const distribution = new cloudfront.Distribution(this, 'QwikDistribution', {
      comment: 'Qwik app distribution (example: composite)',
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
      },
      additionalBehaviors: {
        [`${basepath}*`]: {
          origin: new origins.HttpOrigin(Fn.parseDomainName(qwikAppUrl.url)),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: new cloudfront.CachePolicy(this, 'QwikCachePolicy', {
            comment: 'Qwik app cache policy (example: composite)',
            // as Qwik depends a lot on query strings,
            // we have to forward any query strings to the origin
            queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
            defaultTtl: Duration.seconds(10),
            enableAcceptEncodingGzip: true,
            enableAcceptEncodingBrotli: true,
          }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
        },
      },
    });

    new CfnOutput(this, 'ServiceUrl', {
      description: 'URL of the Qwik app service',
      value: `https://${distribution.distributionDomainName}${basepath}`,
    });
  }
}
