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
        <th>Product Name</th>
        <th>Size</th>
        <th>Unique Code</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(variant) in productVariants" >
        <td>{{ variant.id }}</td>
        <td>{{ variant.product_data.product_name }}</td>
        <td>{{ variant.size_data.size_name }}</td>
        <td>{{ variant.uniq_code }}</td>
        <td>
          <EditButton :onEdit="() => openEditModal(variant)"/>
          <DeleteButton :onDelete="() => deleteProductVariant(variant.id)" :isLoading="lod"/>
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

  <div class="modal fade" ref="modal" id="editProductVariant" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Product Variant</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleEditProductVariant">

                <SelectItemComponent
                    v-model="editVariant.product"
                    :items="products"
                    label="Product"
                    placeholder="Select a product"
                    :error="errors.product?.[0]"
                />
            <!-- Size Select -->
            <SelectItemComponent
                v-model="editVariant.size"
                :items="sizes"
                label="Size"
                placeholder="Select a size"
                :error="errors.size?.[0]"
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
import {
  DeleteButton,
  EditButton,
  SelectItemComponent,
  ModalComponent,
  TableBottomComponent,
  TableHeaderComponent
} from "@/ui-components/index.js";

const store = useStore();

// Vuex data
const productVariants = computed(() => store.getters.allProductVariants);
const products = computed(() => store.getters.allProducts);
const sizes = computed(() => store.getters.allSizes);
const errors = computed(() => store.getters.getProductVariantErrors);
const lod = computed(() => store.state.productVariant.isLoadingVariant);
const editVariant = ref({
  id: '',
  product: '',
  size: ''
});
const modal = ref('')
const currentPage = computed(() => store.getters.currentPageProductVariant);
const totalPages = computed(() => store.getters.totalPagesProductVariant); // Fallback to 1
const totalEntries = computed(() => store.getters.totalCountProductVariant);
const searchQuery = ref('');
const maxVisiblePages = 5;

onMounted(() => {
  store.dispatch('fetchProductVariants');
  store.dispatch('fetchProducts');
  store.dispatch('fetchSizes');
});

// Open  Modal
const openEditModal = (variant) => {
  editVariant.value = {
    id: variant.id,
    product: variant.product_data.product_id,
    size: variant.size_data.size_id
  };

  const modalElement = document.getElementById('editProductVariant');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};
//action
const handleEditProductVariant = async () => {
  if (editVariant.value.id) {
    await store.dispatch('editProductVariant', editVariant.value);
    if (store.getters.getProductVariantErrorMessage.length === 0) {
      const bsModal = bootstrap.Modal.getInstance(modal.value);
      bsModal.hide()
    }
  } else {
    console.error('Variant ID is missing.');
  }
};
//delete action
const deleteProductVariant = async (id) => {
  if (confirm(`Are you sure you want to delete this ${id} Product variant ?`)) {
    await store.dispatch('deleteProductVariant', id);
  }
};

const totalPagesArray = computed(() => {
  const totalPagesValue = totalPages.value ;
  return Array.from({ length: totalPagesValue }, (_, i) => i + 1);
});


const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    store.dispatch('changePageProductVariant', page);
  }
};

const search = () => {
  store.dispatch('searchProductVariants', searchQuery.value);
};
</script>
