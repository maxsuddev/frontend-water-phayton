<!-- MainComponent.vue -->
<template>

  <main id="main" class="main">
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addClient">Add Client</button>

      <h1>Client Tables</h1>
    </div>
    <MessageNotification
        :message="message"
        :errorMessage="errorMessage"
    />
    <section class="section">
      <ClientAdd/>
      <ClientTable/>
    </section>
  </main>
</template>

<script setup>
import {computed} from 'vue';
import store from "@/store/index.js";
import {MessageNotification} from "@/ui-components/index.js";
import ClientTable from "@/components/Client/ClientTable.vue";
import ClientAdd from "@/components/Client/ClientAdd.vue";

const message = computed(() => store.getters.messageClient);
const errorMessage = computed(() => store.getters.errorMessageClient);


</script>
