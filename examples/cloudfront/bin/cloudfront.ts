#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CloudFrontStack } from '../lib/cloudfront-stack';

const app = new cdk.App();
new CloudFrontStack(app, 'qwik-bundle-example-cloudfront', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  tags: {
    project: 'cdk-qwik-bundle',
  },
});
