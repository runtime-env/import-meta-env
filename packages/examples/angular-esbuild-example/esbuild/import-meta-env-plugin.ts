import type { Plugin } from 'esbuild';
import * as importMetaEnv from '@import-meta-env/unplugin';

const plugin: Plugin = importMetaEnv.esbuild({
  example: '.env.example.public',
  transformMode:
    process.env['NODE_ENV'] === 'production' ? 'runtime' : 'compile-time',
});

export default plugin;
