English / [日本語](./README_ja.md)

# Composite Example

A [simple Qwik app](../qwik-app) served via a [Amazon CloudFront](https://aws.amazon.com/cloudfront/) distribution under a non-root basepath.
Suppose a Qwik app is combined with other services under the same domain.

You can learn:
- how to use the [`QwikHandler`](../../api-docs/markdown/cdk-qwik-bundle.qwikhandler.md) construct
- how to configure a CloudFront distribution for a Qwik app
- how to serve a Qwik app under a non-root basepath

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

You will find a CDK stack `qwik-bundle-example-composite` deployed.

### Accessing the deployed app

The CDK stack outputs the URL of the Qwik app service as `ServiceUrl`.
You can retrieve it with the following command:

```sh
aws cloudformation describe-stacks --stack-name qwik-bundle-example-composite --query "Stacks[0].Outputs[?OutputKey=='ServiceUrl'].OutputValue" --output text
```