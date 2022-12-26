<template>
  <div>
    <h1>Number of items {{ tableData.length }}</h1>

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
          <td v-for="field in test(item)" :key="field">{{ field }}</td>
          <!-- <td v-for="field in test(item)" :key="field">{{ field }}</td> -->
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
  if (!sort.value) {
    return tableData.value;
  }

  //   const modified = [...tableData.value];

  const arrayCopy = [...tableData.value];
  const y = arrayCopy.sort((a, b) => compare(a, b, sort.value));

  return y;
});

const test = (object: any) => {
  return Object.values(object);
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
