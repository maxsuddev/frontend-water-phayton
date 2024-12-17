<!-- MainComponent.vue -->
<template>

  <main id="main" class="main">
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSupplier">Add Supplier</button>
      <h1>Supplier Tables</h1>
    </div>
    <MessageNotification
        :message="message"
        :errorMessage="errorMessage"
    />
    <section class="section">
      <SupplierTable/>
      <SupplierAdd />
    </section>
  </main>
</template>

<script setup>
import {computed} from 'vue';
import store from "@/store/index.js";
import SupplierTable from "@/components/Supplier/SupplierTable.vue";
import SupplierAdd from "@/components/Supplier/SupplierAdd.vue";
import {MessageNotification} from "@/ui-components/index.js";

const message = computed(() => store.getters.messageSupplier);
const errorMessage = computed(() => store.getters.errorMessageSupplier);


</script>
