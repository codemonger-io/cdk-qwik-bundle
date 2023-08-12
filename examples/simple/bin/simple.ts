#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SimpleStack } from '../lib/simple-stack';

const app = new cdk.App();
new SimpleStack(app, 'qwik-bundle-example-simple', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  tags: {
    project: 'cdk-qwik-bundle',
  },
});
