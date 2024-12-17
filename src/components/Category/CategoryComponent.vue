<template>
  <main id="main" class="main">
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add Category</button>
      <h1>Category Tables</h1>
    </div>
    <MessageNotification
        :message="message"
        :errorMessage="errorMessage"
    />
    <section class="section">
      <CategoryTable />
      <AddCategoryModal />
    </section>
  </main>
</template>

<script setup>
import {computed} from 'vue';
import CategoryTable from './CategoryTable.vue';
import AddCategoryModal from './CategoryAdd.vue';
import store from "@/store/index.js";
import {MessageNotification} from "@/ui-components/index.js";

const errorMessage = computed(() => store.getters.errorMessageCategory);
const message = computed(() => store.getters.messageCategory);



</script>
