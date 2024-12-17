<!-- ClientTable.vue -->
<template>
  <div>
    <!-- Table with Clients -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Clients</h5>
        <table class="table datatable">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Phone</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.description }}</td>
            <td>{{ client.phone }}</td>
            <td> {{ client.balance}}</td>

            <td><router-link
                v-if="client.id"
                :to="{ name: 'clientProfile', params: { clientId: client.id.toString() } }"
                class="btn btn-info">
              Client Profile
            </router-link>

              <DeleteButton :onDelete="() => deleteClient(client.id)" :isLoading="lod"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Client Modal -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import {DeleteButton} from "@/ui-components/index.js";

const store = useStore();
const clients = computed(() => store.getters.allClient);
const errors = computed(() => store.getters.getErrorClient);
const lod = computed(() => store.state.client.isLoadingClient);

const currentClient = ref(null);
const name = ref('');
const description = ref('');
const phone = ref('');
const modal = ref('')

onMounted(() => {
  store.dispatch('fetchClients');
});

const openEditModal = (selectedClient) => {
  currentClient.value = selectedClient;
  name.value = selectedClient.name;
  description.value = selectedClient.description;
  phone.value = selectedClient.phone;
  const modalElement = document.getElementById('editClient');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const handleEditClient = async () => {
  if (currentClient.value && currentClient.value.id) {
    await store.dispatch('editClient', {
      id: currentClient.value.id,
      name: name.value,
      description: description.value,
      phone: phone.value,
      cud: cud.value,
    });
    if (store.getters.errorMessageClient.length === 0) {
      const bsModal = bootstrap.Modal.getInstance(modal.value);
      bsModal.hide()
    }
  } else {
    console.error("Client ID is missing.");
  }
};

const deleteClient = async (clientId) => {
  if (confirm('Are you sure you want to delete this client?')) {
    await store.dispatch('deleteClient', clientId);
  }
};
</script>
