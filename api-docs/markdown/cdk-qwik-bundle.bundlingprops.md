<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@codemonger-io/cdk-qwik-bundle](./cdk-qwik-bundle.md) &gt; [BundlingProps](./cdk-qwik-bundle.bundlingprops.md)

## BundlingProps interface

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

Properties for [Bundling](./cdk-qwik-bundle.bundling.md)<!-- -->.

**Signature:**

```typescript
export interface BundlingProps extends BundlingOptions 
```
**Extends:** [BundlingOptions](./cdk-qwik-bundle.bundlingoptions.md)

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [architecture](./cdk-qwik-bundle.bundlingprops.architecture.md) | <code>readonly</code> | lambda.Architecture | **_(BETA)_** Architecture of the Lambda function. |
|  [entry](./cdk-qwik-bundle.bundlingprops.entry.md) | <code>readonly</code> | string | **_(BETA)_** Path to the folder containing the Qwik app. |
|  [runtime?](./cdk-qwik-bundle.bundlingprops.runtime.md) | <code>readonly</code> | lambda.Runtime | **_(BETA)_** _(Optional)_ Runtime of the Lambda function. |

