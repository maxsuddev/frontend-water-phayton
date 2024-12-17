<template>
  <main id="main" class="main">
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductVariant">Add Product Variant</button>
      <h1>Product Variant Tables</h1>
    </div>
    <MessageNotification
        :message="message"
        :errorMessage="errorMessage"
    />
    <section class="section">
      <ProductVariantTable  />
      <ProductAddVariant/>
    </section>
  </main>
</template>

<script setup>
import ProductAddVariant from "@/components/ProductVariant/ProductAddVariant.vue";
import ProductVariantTable from "@/components/ProductVariant/ProductVariantTable.vue";
import {MessageNotification} from "@/ui-components/index.js";
import {computed} from "vue";
import store from "@/store/index.js";

const message = computed(() => store.getters.getMessageProductVariant);
const errorMessage = computed(() => store.getters.getProductVariantErrorMessage);

</script>
