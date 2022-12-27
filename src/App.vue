<script setup lang="ts">
import mockData from './mocks/mock.json';
import DataTable from './components/DataTable.vue';
import { TableHeader, TableData } from './components/types';

interface StatusLabels {
  [key: string]: string;
}

const tableHeaderFields: TableHeader[] = [
  { id: 'name', label: 'Project name', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'createdAt', label: 'Created At', sortable: true },
  { id: 'price', label: 'Price', sortable: true },
  { id: 'isContinuous', label: 'is Continuous', sortable: true },
];

const statusLabels: StatusLabels = {
  new: 'light',
  'in progress': 'info',
  completed: 'success',
  rejected: 'danger',
};

const mapTable = (value: string) => {
  const labelClass = statusLabels[value.toLowerCase()];
  return `is-${labelClass}`;
};
</script>

<template>
  <div>
    <h1 class="title is-3">Reusable table component</h1>
    <Data-table v-slot="slotProps" :header-fields="tableHeaderFields" :table-data="mockData">
      <h3 v-if="slotProps.property === 'name'">{{ slotProps.field }}</h3>
      <span v-if="slotProps.property === 'status'" class="tag" :class="mapTable(slotProps.field)">
        {{ slotProps.field }}
      </span>
      <span v-if="slotProps.property === 'createdAt'">
        {{ new Date(slotProps.field).toLocaleDateString() }}
      </span>
      <span v-if="slotProps.property === 'price'">
        {{ new Intl.NumberFormat().format(slotProps.field) }}
      </span>
      <!-- {{ slotProps.property }} -->
      <!-- <span v-else>{{ slotProps.field }}</span> -->
    </Data-table>
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
