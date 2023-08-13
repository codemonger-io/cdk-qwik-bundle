[English](README.md) / 日本語

# シンプルなサンプル

[Amazon API Gateway](https://aws.amazon.com/api-gateway/)の[HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)でシンプルなQwikアプリを配信するサンプル。

以下を学べます。
- [`QwikHandler`](../../api-docs/markdown/cdk-qwik-bundle.qwikhandler.md)コンストラクトの使い方
- QwikアプリをHTTP APIに組み込む方法

## はじめる

### 事前準備

[`examples`フォルダ](../README_ja.md)の[「共通の設定」節](../README_ja.md#共通の設定)で説明している設定を済ませてください。

### 依存関係の解決

```sh
npm install
```

### CloudFormationテンプレートの合成

デプロイする前にどんなCloudFormationテンプレートができたのかチェックしたいところです。

```sh
npx cdk synth -c "@aws-cdk/core:bootstrapQualifier=$TOOLKIT_STACK_QUALIFIER"
```

### CDKスタックのデプロイ

```sh
npx cdk deploy --toolkit-stack-name $TOOLKIT_STACK_NAME -c "@aws-cdk/core:bootstrapQualifier=$TOOLKIT_STACK_QUALIFIER"
```

### デプロイしたアプリへのアクセス

CDKスタックはデプロイしたHTTP APIのURLを`HttpApiUrl`として出力します。
以下のコマンドで取得できます。

```sh
aws cloudformation describe-stacks --stack-name qwik-bundle-example-simple --query "Stacks[0].Outputs[?OutputKey=='HttpApiUrl'].OutputValue" --output text
```