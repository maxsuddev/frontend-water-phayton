
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
        <th>Category</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.category_data.category_name }}</td>
        <td>
          <EditButton :onEdit="() => openEditModal(product)"/>
          <DeleteButton :onDelete="() => deleteProduct(product.id)" :isLoading="lod"/>
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

  <div class="modal fade" id="editProduct" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleEditProduct">
            <InputItemComponent label="Name" type="text" placeholder="Name" v-model="name" />
            <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
            <InputItemComponent label="Description" type="text" placeholder="Description" v-model="description" />
            <p v-if="errors.category" class="text-danger">{{ errors.category[0] }}</p>
            <div class="row mp-3">
              <label class="col-sm-2 col-form-label" for="categorySelect">Category</label>
              <div class="col-sm-10">
                <select
                    class="form-control"
                    v-model="selectedCategoryId"
                    aria-label="Select category">
                  <option disabled value="">Select a category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <p v-if="errors.category" class="text-danger">{{ errors.category[0] }}</p>
            </div>
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
const products = computed(() => store.getters.allProducts);
const categories = computed(() => store.getters.allCategories);
const currentPage = computed(() => store.getters.currentPageProduct);
const totalPages = computed(() => store.getters.totalPagesProduct); // Fallback to 1
const totalEntries = computed(() => store.getters.totalCountProduct);
const searchQuery = ref('');
const maxVisiblePages = 5;
const errors = computed(() => store.getters.getErrorProduct);
const lod = computed(() => store.state.product.isLoadingProduct);
const name = ref('');
const description = ref('');
const selectedCategoryId = ref('');
const product = ref('');
const modal = ref('')

onMounted(() => {
   store.dispatch('fetchProducts')
  store.dispatch('fetchCategories');
});

const openEditModal = (selectedProduct) => {
  product.value = selectedProduct;
  name.value = selectedProduct.name;
  description.value = selectedProduct.description;
  selectedCategoryId.value = selectedProduct.category_data.category_id;
  const modalElement = document.getElementById('editProduct');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const handleEditProduct = async () => {
  if (product.value && product.value.id) {
    await store.dispatch('editProduct', {
      id: product.value.id,
      name: name.value,
      description: description.value,
      category: selectedCategoryId.value,
    });

    if (store.getters.errorMessageProduct.length === 0) {
      const bsModal = bootstrap.Modal.getInstance(modal.value);
      bsModal.hide()
    }
  } else {
    console.error("Product ID is missing.");
  }
};

const deleteProduct = async (productId) => {
  if (confirm(`Are you sure you want to delete this ${productId} product?`)) {
    await store.dispatch('deleteProduct', productId);
  }
};

const totalPagesArray = computed(() => {
  const totalPagesValue = totalPages.value ;
  return Array.from({ length: totalPagesValue }, (_, i) => i + 1);
});

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    store.dispatch('changePageProduct', page);
  }
};

const search = () => {
  store.dispatch('searchProducts', searchQuery.value);
};
</script>