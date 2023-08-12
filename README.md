English / [日本語](README_ja.md)

# cdk-qwik-bundle

Deploy a [Qwik](https://qwik.builder.io) app through [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/).

`cdk-qwik-bundle` provides a CDK construct to deploy a Qwik app to AWS as a [AWS Lambda](https://aws.amazon.com/lambda/) function for an [HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html) integration or [REST API](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html) proxy integration on [Amazon AWS API Gateway (API Gateway)](https://aws.amazon.com/api-gateway/).

## Getting started

### Prerequisites

This library is intended to be combined with the CDK version 2.

### Install

```sh
npm install https://github.com/codemonger-io/cdk-qwik-bundle.git
```

There is no package published to [npm](https://www.npmjs.com) yet.
I would like to publish this library to npm if it could earn enought stars (maybe 10 or more?).

### Qwik City Adapter

There is no Qwik City Adapter dedicated to this library so far, instead, please add [Qwik City AWS Adapter](https://qwik.builder.io/docs/deployments/aws-lambda/) to your Qwik project.
You may need some tweaks on it.

```sh
npm run qwik add aws-lambda
```

Please note that the configuration file (`serverless.yml`) for [serverless](https://www.serverless.com) is not used.

### Bundling Qwik app with CDK

Please create [`QwikHandler`](./api-docs/markdown/cdk-qwik-bundle.qwikhandler.md) to bundle your Qwik app as a Lambda function.

```ts
import * as path from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { QwikHandler } from 'cdk-qwik-bundle';

export class SimpleStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const qwikApp = new QwikHandler(this, 'QwikApp', {
            entry: path.resolve('../qwik-app'),
        });
    }
}
```

You can find working examples in the [`examples` folder](./examples).

## API documentation

Please see the [`api-docs` folder](./api-docs/cdk-qwik-bundle.api.md).

## Acknowledgements

Most of the code was learned and taken from [`aws-cdk-lib/aws-lambda-nodejs`](https://github.com/aws/aws-cdk/tree/main/packages/aws-cdk-lib/aws-lambda-nodejs).

## License

[MIT](./LICENSE)