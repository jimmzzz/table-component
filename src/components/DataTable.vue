<template>
  <div>
    <h1>Number of items {{ tableData.length }}</h1>
    <h1>Number of pages {{ numberOfPages }}</h1>

    <table>
      <thead>
        <tr>
          <th v-for="field in props.headerFields" :key="field.id" @click="sortTableByColumn(field)">
            {{ field.label }}
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

const props = defineProps<{
  headerFields: TableHeader[];
  tableData: TableData[];
}>();

const ROWS_PER_PAGE = 20;
const tableData = ref(props.tableData);
const sort = ref(false);

const sortTableByColumn = (field: TableHeader) => {
  if (!field.sortable) {
    console.warn(`field ${field.id} is not sortable`);
    return;
  }
  console.log(field);
  //   if (sort.value === field.id) {
  //     console.log("reverse");
  //     tableData.value.reverse();
  //   }

  sort.value = field.id;
};

function compare(a, b, propertyName) {
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

  if (!sort.value) {
    return tableData.value;
  }

  const arrayCopy = [...tableData.value];
  const y = arrayCopy.sort((a, b) => compare(a, b, sort.value));

  return y;
});

const numberOfPages = computed(() => {
  return Math.floor((tableData.value.length + ROWS_PER_PAGE - 1) / ROWS_PER_PAGE);
});

const test = (object: TableData) => {
  // const data = props.headerFields.map((field) => field.id);

  // const x = object[data[index]];
  // console.log(index);

  return Object.values(object);
};

const prepareObjectForRow = (object: TableData, index: number) => {
  const data = props.headerFields.map((field) => field.id);
  // const x = object[data[index]];
  console.log(object);
  return object;
};
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
