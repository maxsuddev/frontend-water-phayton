<template>
  <div class="datatable-header d-flex justify-content-between align-items-center">
    <div class="card-title ">
      <h5>User Table</h5>
    </div>
    <div class="datatable-search">
      <input
          class="datatable-input"
          title="Search with table"
          type="search"
          v-model="searchQuery"
          @input="onSearch"
          placeholder="Search by name..."
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "TableHeaderComponent",
  props: {
    searchQuery: {
      type: String,
      required: false,
    },
  },
  emits: ["update:searchQuery", "search"], // Listen for the update event

  setup(props, {emit}) {
    const searchQuery = ref(props.searchQuery);

    // Watch for changes in searchQuery and emit the update event
    watch(searchQuery, (newQuery) => {
      emit("update:searchQuery", newQuery); // Emit the updated value to parent
      emit("search", newQuery); // Emit the search event
    });

    // Function to handle the search input
    const onSearch = () => {
      emit("search", searchQuery.value);
    };

    return {
      searchQuery,
      onSearch,
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
