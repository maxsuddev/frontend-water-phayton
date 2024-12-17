
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
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="size in sizes" :key="size.id">
        <td>{{ size.id }}</td>
        <td>{{ size.name }}</td>
        <td>
          <EditButton :onEdit="() => openEditModal(size)"/>
          <DeleteButton :onDelete="() => deleteSize(size.id)" :isLoading="lod"/>
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
  <div class="modal fade" id="editSize" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Size</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleEditSize">
            <InputItemComponent label="Name" type="text" placeholder="Name" v-model="name" />
            <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
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
const sizes = computed(() => store.getters.allSizes);
const errors = computed(() => store.getters.getErrorSize);
const lod = computed(() => store.state.size.isLoadingSize);
const currentPage = computed(() => store.getters.currentPageSize);
const totalPages = computed(() => store.getters.totalPagesSize); // Fallback to 1
const totalEntries = computed(() => store.getters.totalCountSize);
const searchQuery = ref('');
const maxVisiblePages = 5;

const currentSize = ref(null);
const name = ref('');
const modal = ref('')

onMounted(() => {
  store.dispatch('fetchSizes');
});

const openEditModal = (selectedSize) => {
  currentSize.value = selectedSize;
  name.value = selectedSize.name;

  const modalElement = document.getElementById('editSize');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const handleEditSize = async () => {
  if (currentSize.value && currentSize.value.id) {
    await store.dispatch('editSize', {
      id: currentSize.value.id,
      name: name.value,
    });
    if (store.getters.errorMessageSize.length === 0) {
      const bsModal = bootstrap.Modal.getInstance(modal.value);
      bsModal.hide()
    }
  } else {
    console.error("Size ID is missing.");
  }
};

const deleteSize = async (sizeId) => {
  if (confirm(`Are you sure you want to delete this ${sizeId} size?`)) {
    await store.dispatch('deleteSize', sizeId);
  }
};

const totalPagesArray = computed(() => {
  const totalPagesValue = totalPages.value ;
  return Array.from({ length: totalPagesValue }, (_, i) => i + 1);
});


const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    store.dispatch('changePageSize', page);
  }
};

const search = () => {
  store.dispatch('searchSizes', searchQuery.value);
};
</script>
