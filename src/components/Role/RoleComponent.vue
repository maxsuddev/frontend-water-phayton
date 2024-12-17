<template>
  <main id="main" class="main">
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addRole">Add Role</button>
      <h1>Role Tables</h1>
    </div>
    <MessageNotification
        :message="message"
        :errorMessage="errorMessage"
    />
    <section class="section">
      <RoleTable/>
      <RoleAdd/>
    </section>
  </main>
</template>

<script setup>
import {computed} from 'vue';
import store from "@/store/index.js";
import {MessageNotification} from "@/ui-components/index.js";
import RoleAdd from "@/components/Role/RoleAdd.vue";
import RoleTable from "@/components/Role/RoleTable.vue";


const message = computed(() => store.getters.messageRole);
const errorMessage = computed(() => store.getters.errorMessageRole);



</script>