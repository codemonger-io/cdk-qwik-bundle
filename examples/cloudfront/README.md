English / [日本語](./README_ja.md)

# CloudFront Example

A simple Qwik app served via a [Amazon CloudFront](https://aws.amazon.com/cloudfront/) distribution.

You can learn:
- how to use the [`QwikHandler`](../../api-docs/markdown/cdk-qwik-bundle.qwikhandler.md) construct
- how to configure a CloudFront distribution for a Qwik app

## Getting started

### Prerequisites

Please finish the configurations described in the [Section "Common configurations"](../README.md#common-configurations) in the [`examples` folder](../README.md).

### Resolving dependencies

```sh
npm install
```

### Synthesizing a CloudFormation template

I want to check what CloudFormation template is generated before deploying it.

```sh
npx cdk synth -c "@aws-cdk/core:bootstrapQualifier=$TOOLKIT_STACK_QUALIFIER"
```

### Deploying the CDK stack

```sh
npx cdk deploy --toolkit-stack-name $TOOLKIT_STACK_NAME -c "@aws-cdk/core:bootstrapQualifier=$TOOLKIT_STACK_QUALIFIER"
```

### Accessing the deployed app

The CDK stack outputs the URL of the CloudFront distribution as `DistributionUrl`.
You can retrieve it with the following command:

```sh
aws cloudformation describe-stacks --stack-name qwik-bundle-example-cloudfront --query "Stacks[0].Outputs[?OutputKey=='DistributionUrl'].OutputValue" --output text
```