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
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description}}</td>
          <td>
            <EditButton :onEdit="() => openEditModal(category)" />
            <DeleteButton :onDelete="() => deleteCategory(category.id)" :isLoading="lod" />
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
  <div class="modal fade" id="editModal" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Category</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleEditCategory">
            <InputItemComponent label="Name" type="text" placeholder="Name" v-model="name" />
            <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
            <InputItemComponent label="Description" type="text" placeholder="Description" v-model="description" />
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
    import { DeleteButton, InputItemComponent, TableBottomComponent, TableHeaderComponent, EditButton } from '@/ui-components/index.js';

    const store = useStore();
    const categories = computed(() => store.getters.allCategories || []); // Fallback to empty array
    const errors = computed(() => store.getters.getErrorsCategory);
    const lod = computed(() => store.state.category.isLoadingCategory);
    const name = ref('');
    const description = ref('');
    const category = ref(null);
    const modal = ref()
    const currentPage = computed(() => store.getters.currentPageCategory);
    const totalPages = computed(() => store.getters.totalPagesCategory); // Fallback to 1
    const totalEntries = computed(() => store.getters.totalCountCategory);
    const searchQuery = ref('');
    const maxVisiblePages = 5;

    const openEditModal = (selectedCategory) => {
      category.value = selectedCategory;
      name.value = selectedCategory.name;
      description.value = selectedCategory.description;

      const modalElement = document.getElementById('editModal');
      const OpenModal = new bootstrap.Modal(modalElement,{
        backdrop: 'static',
        keyboard: true
      });
      OpenModal.show();
      modalElement.focus()
    };

    const handleEditCategory = async () => {
      if (category.value && category.value.id) {
        await store.dispatch('editCategory', {
          id: category.value.id,
          name: name.value,
          description: description.value,
        });
        if (store.getters.errorMessageCategory.length === 0) {
          const bsModal = bootstrap.Modal.getInstance(modal.value);
          bsModal.hide()
        }

      } else {
        console.error("Category ID is missing.");
      }
    };
    onMounted(() => {
      store.dispatch('fetchCategories');
    });
    const deleteCategory = async (categoryId) => {
      if (confirm(`Are you sure you want to delete this ${categoryId} category?`)) {
        await store.dispatch('deleteCategory', categoryId);
      }
    };

    const totalPagesArray = computed(() => {
      const totalPagesValue = totalPages.value ;
      return Array.from({ length: totalPagesValue }, (_, i) => i + 1);
    });


    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        store.dispatch('changePageCategory', page);
      }
    };

    const search = () => {
      store.dispatch('searchCategories', searchQuery.value);
    };



  </script>

