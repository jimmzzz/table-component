<template>
  <div>
    <h1>Number of items {{ tableData.length }}</h1>
    <h1>Number of pages {{ numberOfPages }}</h1>
    <pre class="mb-20">sort {{ sort }}</pre>

    <table>
      <thead>
        <tr>
          <th v-for="field in props.headerFields" :key="field.id" @click="sortTableByColumn(field)">
            {{ field.label }}
            <ToolingIcon v-if="sort[0] === field.id" :style="iconStyle" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedTableData" :key="index">
          <td v-for="(field, idx) in item" :key="idx">
            <slot :field="field" :property="idx">{{ field }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { TableData, TableHeader } from './types';
import { computed, ref, defineProps } from 'vue';
import ToolingIcon from './icons/IconTooling.vue';

enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'dsc',
}

const props = defineProps<{
  headerFields: TableHeader[];
  tableData: TableData[];
}>();

const ROWS_PER_PAGE = 20;
const tableData = ref(props.tableData);
const sort = ref<String[]>([]);

const sortTableByColumn = (field: TableHeader) => {
  if (!field.sortable) {
    console.warn(`field ${field.id} is not sortable`);
    return;
  }

  sort.value = [field.id, sort.value[1] === SortOrder.ASCENDING ? SortOrder.DESCENDING : SortOrder.ASCENDING];
};

function compare(a: TableData, b: TableData, propertyName: string) {
  if (a[propertyName] < b[propertyName]) {
    return -1;
  }
  if (a[propertyName] > b[propertyName]) {
    return 1;
  }
  return 0;
}

const sortedTableData = computed(() => {
  // const x = tableData.value.slice(0, 20);
  const sortType = sort.value[1];

  if (!sort.value) {
    return tableData.value;
  }

  const arrayCopy = [...tableData.value];
  let result = [];

  if (!sortType || sortType === SortOrder.ASCENDING) {
    result = arrayCopy.sort((a, b) => compare(a, b, String(sort.value[0])));
  } else {
    result = arrayCopy.sort((a, b) => compare(b, a, String(sort.value[0])));
  }

  return result;
});

const iconStyle = computed(() => {
  return {
    transform: sort.value[1] === SortOrder.DESCENDING ? 'rotate(180deg)' : 'rotate(0deg)',
  };
});

const numberOfPages = computed(() => {
  return Math.floor((tableData.value.length + ROWS_PER_PAGE - 1) / ROWS_PER_PAGE);
});
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
