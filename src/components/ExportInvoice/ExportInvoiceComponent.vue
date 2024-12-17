
<template>
  <!-- MainComponent.vue -->
  <main id="main" class="main">
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addExportInvoice">Add Export Invoice</button>
      <h1>Export Tables</h1>
    </div>

    <MessageNotification
        :message="message"
        :errorMessage="errorMessage"
    />
    <section class="section">
      <ExportInvoiceTable/>
      <ExportInvoiceAdd/>
    </section>
  </main>
</template>
<script setup>
import {computed} from 'vue';
import store from "@/store/index.js";
import {MessageNotification} from "@/ui-components/index.js";
import ExportInvoiceTable from "@/components/ExportInvoice/ExportInvoiceTable.vue";
import ExportInvoiceAdd from "@/components/ExportInvoice/ExportInvoiceAdd.vue";

const message = computed(() => store.getters.messageExportInvoice);
const errorMessage = computed(() => store.getters.errorMessageExportInvoice);

</script>

<style scoped>

</style>