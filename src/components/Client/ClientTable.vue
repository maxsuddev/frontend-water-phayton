<!-- ClientTable.vue -->
<template>

  <TableHeaderComponent
      v-model:searchQuery="searchQuery"
      @search="search"
  />

  <div class="datatable-container">
    <table class="table datatable datatable-table">
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
  <TableBottomComponent
      :totalEntries="totalEntries"
      :currentPage="currentPage"
      :totalPagesArray="totalPagesArray"
      :maxVisiblePages="maxVisiblePages"
      :totalPages="totalPages"
      @page-change="changePage"
  />

    <!-- Edit Client Modal -->
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import {DeleteButton, TableBottomComponent, TableHeaderComponent} from "@/ui-components/index.js";

const store = useStore();
const clients = computed(() => store.getters.allClient);
const errors = computed(() => store.getters.getErrorClient);
const lod = computed(() => store.state.client.isLoadingClient);
const currentPage = computed(() => store.getters.currentPageClient);
const totalPages = computed(() => store.getters.totalPagesClient); // Fallback to 1
const totalEntries = computed(() => store.getters.totalCountClient);
const searchQuery = ref('');
const maxVisiblePages = 5;

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


const totalPagesArray = computed(() => {
  const totalPagesValue = totalPages.value ;
  return Array.from({ length: totalPagesValue }, (_, i) => i + 1);
});


const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    store.dispatch('changePageClient', page);
  }
};

const search = () => {
  store.dispatch('searchClients', searchQuery.value);
};

</script>
