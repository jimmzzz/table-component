# Reusable table component

Reusable table component for rendering list of tabular data.

## Features

1. sortable columns (Ascending/descending order) - required
2. full-text search - required
3. scoped slots used for customization of specific table fields
4. optional default sort for table (props)

## Potencial problems/improvments & proposed solutions
1. rendering large data set (number of DOM nodes) - potencial performance problems
  2. Solution would be to limit number of rendered items - pagination
  3. List virtualization - [Virtualize Large Lists](https://vuejs.org/guide/best-practices/performance.html#virtualize-large-lists)
2. Filtering is triggered on every keystroke - potencial problems on large data set
   1. debounce could trigger excessive filtering Fn after certain timeout after last key stroke
3. Limit/Specify fields for full-text search - faster iterating over objects

## Tech Stack

1. VUE + Typescript (created via CLI)
2. [Bulma](https://bulma.io/) (CSS framework) 



## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `**vue**-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

# Potencial improvments

## Component features

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```
