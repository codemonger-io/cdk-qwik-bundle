[English](README.md) / 日本語

# サンプル

- [`simple`: QwikアプリをHTTP APIで配信](./simple/README_ja.md)
- [`cloudfront`: QwikアプリをCloudFrontディストリビューションで配信](./cloudfront/README_ja.md)
- [`composite`: QwikアプリをCloudFrontディストリビューションでルート以外のベースパスから配信](./composite/README_ja.md)

[`qwik-app`フォルダ](./qwik-app/README_ja.md)にはサンプルで使用するQwikアプリが含まれています。

## 共通の設定

### AWS_PROFILEの設定

[AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/)スタックをデプロイするには十分な権限が設定されたクレデンシャルが必要です。
以下は私の[名前付きプロファイル(`AWS_PROFILE`)](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-using-profiles)を設定する例です。

```sh
export AWS_PROFILE=codemonger-jp
```

### ツールキットスタック名の設定

デフォルトのツールキットスタックを使ってもよいですが、個人的には各プロジェクトごとにツールキットスタックを作るのが好みです。プロジェクトを削除した後の後始末が楽だからです。
デフォルト以外のツールキットスタックを作成する場合は、[Synthesizer Qualifierも設定](#synthesizer-qualifierの設定)した方がよいです。

```sh
TOOLKIT_STACK_NAME=qwik-bundle-examples-toolkit
```

### Synthesizer Qualifierの設定

ユニークなQualifierを設定しないと、ツールキットスタック間の衝突が発生するかもしれません。

```sh
TOOLKIT_STACK_QUALIFIER=qwikbndlex
```

### ツールキットスタックを確保

```sh
npx cdk bootstrap --toolkit-stack-name $TOOLKIT_STACK_NAME --qualifier $TOOLKIT_STACK_QUALIFIER
```

いずれかのサンプルフォルダ内でコマンドを実行してください。
ツールキットスタックはすべてのサンプルで共通なので、上記は一度だけ行えばよいです。