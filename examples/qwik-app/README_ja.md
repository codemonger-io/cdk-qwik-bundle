[English](./README.md) / 日本語

# cdk-qwik-bundleデモ用Qwik Cityアプリ

このシンプルなQwikアプリは`cdk-qwik-bundle`のデモンストレーション用です。
このアプリは空のアプリとして作成(`npm create qwik@latest`)し、それから[AWS Adapter](https://qwik.builder.io/docs/deployments/aws-lambda/)を追加(`npm run qwik add aws-lambda`)しました。
["Getting Started"ガイド](https://qwik.builder.io/docs/getting-started/)にあるチュートリアルのコンテンツと、追加の[設定](#設定)を含みます。

## 設定

### ベースパスの設定

デフォルトのベースパスはスラッシュひとつ('/')です。
`DISTRIBUTION_BASEPATH`環境変数で変更することができます。

```sh
export DISTRIBUTION_BASEPATH=/my-basepath/
```

指定した値は[`base`オプション](https://vitejs.dev/config/shared-options.html#base)としてViteを設定するのに使われます。
[`composite`サンプル](../composite/README_ja.md)では[`QwikHandler`](../../api-docs/markdown/cdk-qwik-bundle.qwikhandler.md)で`DISTRIBUTION_BASEPATH`を指定する方法を紹介しています。
どのように機能するか興味があれば、[`vite.config.ts`](./vite.config.ts)をご覧ください。

ベースパスはQwikアプリ内で[`import.meta.env.BASE_URL`](https://vitejs.dev/guide/build.html#public-base-path)としてアクセスでき、Viteが置き換えてくれます。
使い方の例として、[`src/routes/index.tsx`](./src/routes/index.tsx)をご覧ください。

## 以下の節はQwik City Appの元々のREADME.mdの内容です(ご参考)

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)

---

## Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Add Integrations and deployment

Use the `npm run qwik add` command to add additional integrations. Some examples of integrations includes: Cloudflare, Netlify or Express Server, and the [Static Site Generator (SSG)](https://qwik.builder.io/qwikcity/guides/static-site-generation/).

```shell
npm run qwik add # or `yarn qwik add`
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start # or `yarn start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
npm run preview # or `yarn preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
npm run build # or `yarn build`
```
