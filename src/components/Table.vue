<template>
  <div>
    <h1>Number of items {{ tableData.length }}</h1>

    <table>
      <thead>
        <tr>
          <th
            v-for="field in tableFields"
            :key="field.id"
            @click="sortTableByColumn(field)"
          >
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedTableData" :key="item.name">
          <td v-for="field in test(item)" :key="field">{{ field }}</td>
          <!-- <td v-for="field in test(item)" :key="field">{{ field }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import mockData from "./../mocks/mock.json";
import { computed, ref } from "vue";

const tableData = ref(mockData);
const sort = ref(false);

//TODO: active fields array

const sortTableByColumn = (field: string) => {
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

const tableFields = [
  { id: "name", label: "Project name" },
  { id: "status", label: "Status" },
  { id: "createdAt", label: "Created At" },
  { id: "price", label: "Price" },
  { id: "isContinuous", label: "is Continuous" },
];
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
