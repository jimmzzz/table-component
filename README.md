# Reusable table component

Reusable component for rendering table data.

## Features

1. sortable columns (Ascending/descending order) - required
2. full-text search - required
3. scoped slots used for customization/styling of specific table fields
4. optional default sort for table (props)
5. "no records found" message if search does not match any data

## Potencial problems/improvements & proposed solutions
1. rendering large data set (number of DOM nodes) - potencial performance problems
  - Solution would be to limit number of rendered items - pagination
  - List virtualization - [Virtualize Large Lists](https://vuejs.org/guide/best-practices/performance.html#virtualize-large-lists)
2. Filtering is triggered on every keystroke - potencial problems on large data set
  - debounce could trigger excessive filtering Fn after certain timeout of last key stroke
3. Limit/Specify fields for full-text search - faster iterating over objects
4. Date field filtering does not work correctly for formated data and search only for source data in format e.g `2022-07-02T13:40:03.575Z` simple solution would be map data in desired format or complex would need some advanced logic for handling different Date formats.

## Used technologies (Tech Stack)

1. JS/TS
2. VUE 3 (project created via VUE CLI)
3. [Bulma](https://bulma.io/) (CSS framework) 

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
