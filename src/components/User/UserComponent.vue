<!-- MainComponent.vue -->
<template>

  <main id="main" class="main">
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Data Tables</h1>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUser">Add User</button>

    </div>
    <MessageNotification
        :message="message"
        :errorMessage="errorMessage"
    />
    <section class="section">
      <UserTable/>
      <UserAdd/>
    </section>
  </main>
</template>

<script setup>
import {computed} from 'vue';
import store from "@/store/index.js";
import UserTable from "@/components/User/UserTable.vue";
import UserAdd from "@/components/User/UserAdd.vue";
import {MessageNotification} from "@/ui-components/index.js";

const message = computed(() => store.getters.messageUser);
const errorMessage = computed(() => store.getters.errorMessageUser);


</script>
