English / [日本語](./README_ja.md)

# Simple Example

A simple Qwik app served via an [HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html) on [Amazon API Gateway](https://aws.amazon.com/api-gateway/).

You can learn:
- how to use the [`QwikHandler`](../../api-docs/markdown/cdk-qwik-bundle.qwikhandler.md) construct
- how to integrate a Qwik app into an HTTP API

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

You will find a CDK stack `qwik-bundle-example-simple` deployed.

### Accessing the deployed app

The CDK stack outputs the URL of the deployed HTTP API as `HttpApiUrl`.
You can retrieve it with the following command:

```sh
aws cloudformation describe-stacks --stack-name qwik-bundle-example-simple --query "Stacks[0].Outputs[?OutputKey=='HttpApiUrl'].OutputValue" --output text
```