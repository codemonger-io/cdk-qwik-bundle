import typescript from '@rollup/plugin-typescript';
import { builtinModules } from 'module';

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    dir: 'dist',
    sourcemap: true,
  },
  external: [
    ...builtinModules,
    'aws-cdk-lib',
    'constructs',
  ],
  plugins: [typescript()],
};
