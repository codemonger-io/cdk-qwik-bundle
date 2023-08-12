English / [日本語](README_ja.md)

# Examples

- [A simple Qwik app served via an HTTP API](./simple)

## Common configurations

### Setting AWS_PROFILE

You need a credential configured with sufficient previleges to deploy an [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/) stack.
Here is an example to set my [named profile (`AWS_PROFILE`)](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-using-profiles):

```sh
export AWS_PROFILE=codemonger-jp
```

### Setting the toolkit stack name

You can use the default toolkit stack, though, I prefer to create a toolkit stack dedicated to each project, because it makes cleanup easier.
If you want to create a toolkit stack other than the default, you should also [set the synthesizer qualifier](#setting-the-synthesizer-qualifier).

```sh
TOOLKIT_STACK_NAME=qwik-bundle-examples-toolkit
```

### Setting the synthesizer qualifier

Without a unique qualifier, conflicts between different toolkit stacks may occur.

```sh
TOOLKIT_STACK_QUALIFIER=qwikbndlex
```

### Provisioning the toolkit stack

```sh
npx cdk bootstrap --toolkit-stack-name $TOOLKIT_STACK_NAME --qualifier $TOOLKIT_STACK_QUALIFIER
```

You have to run this command in one of the example folders.
Since the toolkit stack is shared by all the examples, you need to do this only once.