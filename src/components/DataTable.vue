<template>
  <div>
    <h1>Number of items: {{ originalTableData.length }}</h1>
    <h1>Number of pages: {{ numberOfPages }}</h1>
    <p class="mb-5">Number of search results: {{ filteredTableData.length }}</p>
    <!-- <pre class="mb-20">
      searchTerm {{ searchTerm }}
      sort {{ sort }}
    </pre> -->

    <!-- SearchInput -->
    <div class="control my-4">
      <label class="label" for="search">Table search</label>
      <input v-model="searchTerm" class="input" type="text" placeholder="Enter search query..." />
    </div>

    <!-- TABLE -->
    <table class="table is-striped is-bordered is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th
            class="py-4 has-background-white-ter has-text-weight-medium"
            v-for="field in props.headerFields"
            :key="field.id"
            @click="sortTableByColumn(field)"
          >
            {{ field.label }}
            <ToolingIcon v-if="sort[0] === field.id" :style="iconStyle" />
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="sortedTableData.length">
          <tr v-for="(item, index) in sortedTableData" :key="`${item.name}${index}`">
            <td v-for="(field, idx) in item" :key="`${field}${idx}`">
              <slot :field="field" :property="idx">{{ field }}</slot>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td class="has-text-centered" colspan="100%">No matching items. Try change search query</td>
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
table,
td,
th {
  /* width: 14.2%; calc TODO: 100% number of columns */
  /* text-align: center; */
  /* width: auto; */
  /* padding: 5px; */
}
/* th {
  background: #ddeeee;
} */
/* table {
  width: 400px;
  border-collapse: collapse;
} */
</style>
