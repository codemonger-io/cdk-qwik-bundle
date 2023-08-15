[English](README.md) / 日本語

# cdk-qwik-bundle

[Qwik](https://qwik.builder.io)アプリを[AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/)でデプロイ。

`cdk-qwik-bundle`は、Qwikアプリを[Amazon AWS API Gateway (API Gateway)](https://aws.amazon.com/api-gateway/)の[HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)インテグレーションもしくは[REST API](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)プロキシインテグレーション用の[AWS Lambda](https://aws.amazon.com/lambda/)関数としてAWSにデプロイするCDK Constructを提供します。

## はじめる

### 事前準備

このライブラリはCDKバージョン2と組み合わせることを想定しています。

### インストール

```sh
npm install https://github.com/codemonger-io/cdk-qwik-bundle.git#v0.1.0
```

まだ[npm](https://www.npmjs.com)にはパッケージを公開していません。
十分なスター(10個かそれ以上?)がいただけたら、このライブラリをnpmに公開したいと思っています。

### Qwik City Adapter

このライブラリのためのQwik City Adapterは特にありません。代わりに、[Qwik City AWS Adapter](https://qwik.builder.io/docs/deployments/aws-lambda/)をQwikプロジェクトに追加してください。
追加でプロジェクトの調整が必要かもしれません。

```sh
npm run qwik add aws-lambda
```

[serverless](https://www.serverless.com)用の設定ファイル(`serverless.yml`)は使いませんのでご注意ください。

### CDKでQwikアプリをバンドルする

QwikアプリをLambda関数としてバンドルするには[`QwikHandler`](./api-docs/markdown/cdk-qwik-bundle.qwikhandler.md)を作成してください。

```ts
import * as path from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { QwikHandler } from '@codemonger-io/cdk-qwik-bundle';

export class SimpleStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const qwikApp = new QwikHandler(this, 'QwikApp', {
            entry: path.resolve('../qwik-app'),
        });
    }
}
```

[`examples`フォルダ](./examples/README_ja.md)に動作するサンプルがあります。

## APIドキュメント

[`api-docs`フォルダ](./api-docs/markdown/index.md)をご覧ください(英語版のみ)。

## 謝辞

ほとんどのコードは[`aws-cdk-lib/aws-lambda-nodejs`](https://github.com/aws/aws-cdk/tree/main/packages/aws-cdk-lib/aws-lambda-nodejs)を参考・拝借しました。

## ライセンス

[MIT](./LICENSE)