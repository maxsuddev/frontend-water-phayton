
<template>
  <!-- MainComponent.vue -->
    <main id="main" class="main">
      <div class="pagetitle d-flex justify-content-between align-items-center">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addImportInvoice">Add Import Invoice</button>
        <h1>Import Tables</h1>
      </div>

      <MessageNotification
          :message="message"
          :errorMessage="errorMessage"
      />
      <section class="section">
        <ImportInvoiceTable/>
        <ImportInvoiceAdd/>
      </section>
    </main>
</template>
  <script setup>
    import {computed} from 'vue';
    import ImportInvoiceAdd from "@/components/Import Invoice/ImportInvoiceAdd.vue";
    import ImportInvoiceTable from "@/components/Import Invoice/ImportInvoiceTable.vue";
    import store from "@/store/index.js";
  import {MessageNotification} from "@/ui-components/index.js";

    const message = computed(() => store.getters.messageImportInvoice);
    const errorMessage = computed(() => store.getters.errorMessageImportInvoice);

  </script>

<style scoped>

</style>