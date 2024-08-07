---
layout: home

title: Import-meta-env
titleTemplate: Startup/Runtime environment variables solution for JavaScript

hero:
  name: Import-meta-env
  text: Startup/Runtime environment variables solution for JavaScript
  tagline: Build once, deploy anywhere. Import-meta-env helps to developing applications following the 12-factor principles.
  image: /glance.png
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started/introduction.html#guide
    - theme: alt
      text: Examples
      link: https://github.com/import-meta-env/import-meta-env/tree/main/packages/examples

features:
  - title: Security First
    details: No environment variables will be exposed to clients unless you define it in a .env.example file.
  - title: Compile Safe
    details: No more forgetting to provide environment variables. Using Import-meta-env, if your code compiles, it works.
  - title: Type-safe
    details: No more typos. Import-meta-env automatically generates types for your environment variables by using the .env.example file as a source of type information.
  - title: Versatile
    details: Support for Babel, SWC, and Unplugin for ESbuild, Rollup, Vite, Webpack, etc.
  - title: Adoptable
    details: Designed with a generic approach in mind, CSR/SSR, transpilers/bundlers, workers, service workers, and even micro frontend are all supported.
  - title: Save Time & Money
    details: Speed up your CI/CD pipeline, you no longer need to build multiple bundles for different stages.
---
