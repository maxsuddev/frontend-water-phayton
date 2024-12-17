<!-- MainComponent.vue -->
<template>

  <main id="main" class="main">
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSize">Add Size</button>
      <h1>Size Tables</h1>
    </div>
    <MessageNotification
        :message="message"
        :errorMessage="errorMessage"
    />
    <section class="section">
      <SizeTable/>
      <SizeAdd />
    </section>
  </main>
</template>

<script setup>
import {computed, ref} from 'vue';
import SizeAdd from "@/components/Size/SizeAdd.vue";
import SizeTable from "@/components/Size/SizeTable.vue";
import store from "@/store/index.js";
import {MessageNotification} from "@/ui-components/index.js";

const message = computed(() => store.getters.messageSize);
const errorMessage = computed(() => store.getters.errorMessageSize);


</script>
