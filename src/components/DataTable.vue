<template>
  <div>
    <hr class="my-2" />
    <div>Number of items: {{ originalTableData.length }}</div>
    <div>Number of pages: {{ numberOfPages }}</div>
    <div class="mb-3">Number of search results: {{ filteredTableData.length }}</div>
    <hr class="my-2" />

    <pre class="mb-20">
      SortOrder {{ sortOrder }}
      sortByField {{ sortByField }}
    </pre>

    <!-- SearchInput -->
    <div class="control my-4">
      <label class="label" for="search">Table search</label>
      <input v-model="searchTerm" class="input" type="text" placeholder="Enter search query..." />
    </div>

    <!-- TABLE -->
    <div class="table-container">
      <table class="table is-striped is-bordered is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th
              :class="{ 'is-clickable': field.sortable }"
              class="py-4 has-background-white-ter has-text-weight-medium"
              v-for="field in props.headerFields"
              :key="field.id"
              @click="sortTableByColumn(field)"
            >
              {{ field.label }}
              <ToolingIcon v-if="sortByField === field.id" :style="iconStyle" />
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="sortedTableData.length">
            <tr v-for="(item, index) in sortedTableData" :key="`${item.name}${index}`" v-memo="[item.name]">
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, watch, shallowRef } from 'vue';
import type { TableData, TableHeader, SortOptions } from './types';
import { SortOrder } from './types';
import ToolingIcon from './icons/IconTooling.vue';

const props = defineProps<{
  headerFields: TableHeader[];
  tableData: TableData[];
  defaultSort?: SortOptions;
}>();

const ROWS_PER_PAGE = 20;

const originalTableData = shallowRef<TableData[]>(props.tableData);
const filteredTableData = shallowRef<TableData[]>([]);
const sortOrder = ref(props?.defaultSort?.length === 2 ? props?.defaultSort[0] : '');
const sortByField = ref(props?.defaultSort?.length === 2 ? props?.defaultSort[1] : '');
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

  const sort = sortOrder.value === SortOrder.ASCENDING ? SortOrder.DESCENDING : SortOrder.ASCENDING;
  sortOrder.value = sort;
  sortByField.value = field.id;
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
  let arrayCopy = [...(filteredTableData.value.length ? filteredTableData.value : originalTableData.value)];

  const sortType = sortOrder;
  let result = [];

  if (!sortType.value || sortType.value === SortOrder.ASCENDING) {
    result = arrayCopy.sort((a, b) => compare(a, b, String(sortByField.value)));
  } else {
    result = arrayCopy.sort((a, b) => compare(b, a, String(sortByField.value)));
  }

  return result;
});

const iconStyle = computed(() => {
  return {
    transform: sortOrder.value === SortOrder.DESCENDING ? 'rotate(180deg)' : 'rotate(0deg)',
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
