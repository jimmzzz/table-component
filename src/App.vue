<script setup lang="ts">
import mockData from './mocks/mock.json';
import DataTable from './components/DataTable.vue';
import { TableHeader, TableData } from './components/types';

const tableHeaderFields: TableHeader[] = [
  { id: 'name', label: 'Project name', sortable: true },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'price', label: 'Price' },
  { id: 'isContinuous', label: 'is Continuous' },
];
</script>

<template>
  <div>
    <h1>Table component</h1>
    <Data-table :header-fields="tableHeaderFields" :table-data="mockData" />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
