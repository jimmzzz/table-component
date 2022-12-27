<template>
  <div>
    <h1>Number of items {{ originalTableData.length }}</h1>
    <h1>Number of pages {{ numberOfPages }}</h1>
    <pre class="mb-20">
      searchTerm {{ searchTerm }}
      sort {{ sort }}
    </pre>
    <p class="py-1">Number of filtered data {{ filteredTableData.length }}</p>

    <!-- SearchInput -->
    <div class="control my-4">
      <label class="label" for="search">Search input</label>
      <input v-model="searchTerm" class="input" type="text" placeholder="Enter search..." />
    </div>

    <!-- TABLE -->
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
        <tr v-for="(item, index) in sortedTableData" :key="`${item.name}${index}`">
          <td v-for="(field, idx) in item" :key="`${field}${idx}`">
            <slot :field="field" :property="idx">{{ field }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { TableData, TableHeader } from './types';
import { computed, ref, defineProps, watch } from 'vue';
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

const originalTableData = ref<TableData[]>(props.tableData);
const filteredTableData = ref<TableData[]>([]);
const sort = ref<String[]>([]);
const searchTerm = ref('');

// const filterItems = (event: Event) => {
//   searchTerm.value = event.target?.value;

//   if (!searchTerm.value) {
//     console.log('called here why?');
//     return tableData.value;
//   }

//   tableData.value = tableData.value.filter((item) =>
//     String(item.price).toLowerCase().includes(searchTerm.value.toLowerCase())
//   );
//   console.log('tableData', tableData.value);
// };

watch(searchTerm, (searchInput) => {
  if (!searchInput) {
    filteredTableData.value = originalTableData.value;
    return;
  }

  filteredTableData.value = [...filterList(searchInput, originalTableData.value)];
});

const filterList = (input: string, list: TableData[]) => {
  const proccesedInput = input.trim().toLowerCase();
  return list.filter((item) => {
    return Object.values(item).some((el) => String(el).toLowerCase().trim().includes(proccesedInput));
  });
};

const sortTableByColumn = (field: TableHeader) => {
  if (!field.sortable) {
    console.warn(`field ${field.id} is not sortable`);
    return;
  }

  sort.value = [field.id, sort.value[1] === SortOrder.ASCENDING ? SortOrder.DESCENDING : SortOrder.ASCENDING];
  filteredTableData.value = [...sortedTableData.value];
};

const compare = (a: TableData, b: TableData, propertyName: string) => {
  if (a[propertyName] < b[propertyName]) {
    return -1;
  }
  if (a[propertyName] > b[propertyName]) {
    return 1;
  }
  return 0;
};

const sortedTableData = computed(() => {
  if (!searchTerm.value && !filteredTableData.value.length) {
    return originalTableData.value;
  }

  const sortType = sort.value[1];
  const arrayCopy = [...filteredTableData.value];
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
  return Math.floor((originalTableData.value.length + ROWS_PER_PAGE - 1) / ROWS_PER_PAGE);
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
