<template>
  <main id="main" class="main">
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProduct">Add Product</button>
      <h1>Product Tables</h1>
    </div>
    <MessageNotification
        :message="message"
        :errorMessage="errorMessage"
    />
    <section class="section">
      <ProductTable  />
      <ProductAdd/>
    </section>
  </main>
</template>

<script setup>
import {computed} from 'vue';
import ProductTable from "@/components/Product/ProductTable.vue";
import ProductAdd from "@/components/Product/ProductAdd.vue";
import store from "@/store/index.js";
import {MessageNotification} from "@/ui-components/index.js";


const message = computed(() => store.getters.messageProduct);
const errorMessage = computed(() => store.getters.errorMessageProduct);



</script>