
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
        <th>Phone Number</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="supplier in suppliers" :key="supplier.id">
        <td>{{ supplier.id }}</td>
        <td>{{ supplier.name }}</td>
        <td>{{ supplier.phone_number}}</td>
        <td>
          <EditButton :onEdit="() => openEditModal(supplier)"/>
          <DeleteButton :onDelete="() => deleteSupplier(supplier.id)" :isLoading="lod"/>
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
<!--  Modal-->
  <div class="modal fade" id="editSupplier" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Supplier</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleEditSupplier">
            <InputItemComponent
                label="Name" type="text"
                placeholder="Name"
                v-model="name"
                :errors="errors.name?.[0]"
            />
            <InputItemComponent
                label="Phone Number"
                type="text"
                placeholder="Phone Number"
                v-model="phone_number"
                :errors="errors.phone?.[0]"
            />

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button :disabled="lod" type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import InputItemComponent from "@/ui-components/InputItemComponent.vue";
import {DeleteButton, EditButton, TableBottomComponent, TableHeaderComponent} from "@/ui-components/index.js";

const store = useStore();
const suppliers = computed(() => store.getters.allSuppliers);
const errors = computed(() => store.getters.getErrorSupplier);
const lod = computed(() => store.state.supplier.isLoadingSupplier);
const currentSupplier = ref(null);
const name = ref('');
const phone_number = ref('')
const modal = ref('')
const currentPage = computed(() => store.getters.currentPageSupplier);
const totalPages = computed(() => store.getters.totalPagesSupplier); // Fallback to 1
const totalEntries = computed(() => store.getters.totalCountSupplier);
const searchQuery = ref('');
const maxVisiblePages = 5;
onMounted(() => {
  store.dispatch('fetchSuppliers');
});

const openEditModal = (selectedSupplier) => {
  currentSupplier.value = selectedSupplier;
  name.value = selectedSupplier.name;
  phone_number.value = selectedSupplier.phone_number;

  const modalElement = document.getElementById('editSupplier');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const handleEditSupplier = async () => {
  if (currentSupplier.value && currentSupplier.value.id) {
    await store.dispatch('editSupplier', {
      id: currentSupplier.value.id,
      name: name.value,
      phone_number: phone_number.value,
    });
    if (store.getters.errorMessageSupplier.length === 0) {
      const bsModal = bootstrap.Modal.getInstance(modal.value);
      bsModal.hide()
    }
  } else {
    console.error("Supplier ID is missing.");
  }
};

const deleteSupplier = async (supplierId) => {
  if (confirm('Are you sure you want to delete this supplier?')) {
    await store.dispatch('deleteSupplier', supplierId);
  }
};

const totalPagesArray = computed(() => {
  const totalPagesValue = totalPages.value ;
  return Array.from({ length: totalPagesValue }, (_, i) => i + 1);
});


const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    store.dispatch('changePageSupplier', page);
  }
};

const search = () => {
  store.dispatch('searchSuppliers', searchQuery.value);
};
</script>
