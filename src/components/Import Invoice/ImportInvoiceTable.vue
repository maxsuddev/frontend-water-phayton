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
          <th>Supplier Name</th>
          <th>State</th>
          <th>By User</th>
        </tr>
        </thead>
        <tbody>
        <tr style="cursor: pointer" v-for="importInvoice in importInvoices" :key="importInvoice.id" @click="openEditModal(importInvoice)">
          <td>{{ importInvoice.id }}</td>
          <td>{{ importInvoice.supplier_data.supplier_name }}</td>
          <td>
              <label
                  class="badge mx-1"
                  :class="{
                'bg-primary': importInvoice.state === 'new',
                'bg-danger': importInvoice.state === 'canceled',
                'bg-success': importInvoice.state === 'accepted'
    }"
              >
                {{ importInvoice.state }}
              </label>
            </td>

          <td>{{ importInvoice.user_data.username }}</td>
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
  <div class="modal fade" ref="modal" id="editImportInvoice" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Import Invoice</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleEditImportInvoice">
            <div class="row mb-3">
              <label class="col-form-label" for="supplier"><b>Supplier</b></label>
              <div class="col-sm-10">
                <select v-model="editImportInvoice.supplier" class="form-control w-50">
                  <option disabled value="">Select a supplier</option>
                  <option v-for="supplier in suppliers"
                          :key="supplier.id"
                          :value="supplier.id">
                    {{ supplier.name }}
                  </option>
                </select>
              </div>
            </div>
            <table class="mt-5 mb-10 table datatable">
              <thead>
              <tr>
                <th>Variant</th>
                <th>Quantity</th>
                <th>Input price</th>
                <th v-if="editImportInvoice.state === 'new'" >Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ getVariantName(item.variant) }}</td>
                <td>
                  <span v-if="!item.isEditing">{{ item.quantity }}</span>
                  <input
                      v-else
                      type="number"
                      v-model="item.quantity"
                      class="form-control"
                  />
                </td>
                <td>
                  <span v-if="!item.isEditing">{{ item.input_price }}</span>
                  <input
                      v-else
                      type="number"
                      v-model="item.input_price"
                      class="form-control"
                  />
                </td>
                <td>
                    <span v-if="editImportInvoice.state === 'new'">
                    <EditInvoiceButton
                        v-if="!item.isEditing"
                        @click="enableEditing(index)"
                        type="button"
                    >
                    </EditInvoiceButton>
                    <SaveButton
                        v-else
                        @click="saveEditing(index)"
                        type="button"
                    >
                    </SaveButton>
                    <DeleteInvoiceButton
                        @click="deleteItem(index)"
                        type="button">
                    </DeleteInvoiceButton>
                      </span>
                </td>
              </tr>
              </tbody>
            </table>

            <div v-if="editImportInvoice.state === 'new'" class="row mb-3 align-items-center">
              <div class="col-md-4">
                <select v-model="newItem.variant" class="form-control">
                  <option disabled value="">Select a product</option>
                  <option v-for="product in productVariants"
                          :key="product.id"
                          :value="product.id"
                          @keydown.enter.prevent="addItem"
                  >
                    {{ product.product_data.product_name }} ({{ product.size_data.size_name }})
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <input
                    type="number" class="form-control"
                    placeholder="Quantity"
                    v-model="newItem.quantity"
                    @keydown.enter.prevent="addItem"
                />
              </div>
              <div class="col-md-4">
                <input
                    type="number"
                    class="form-control"
                    placeholder="Price"
                    v-model="newItem.input_price"
                    @keydown.enter.prevent="addItem"
                />
              </div>
            </div>
            <button  v-if="editImportInvoice.state === 'new'"
                    type="submit"
                    class="btn btn-secondary"
                    @keydown.enter.prevent="addItem"
                    @click="addItem">
              <i class="bi bi-plus-circle"></i> Add Item
            </button>
            <div v-if="editImportInvoice.state === 'new'"  class="modal-footer">
              <!--                <button :disabled="lod" @click="cancelEditing" type="button" class="btn btn-secondary" data-bs-dismiss="modal">-->
              <!--                  <i class="bi bi-x-circle"></i> Close-->
              <!--                </button>-->
              <button :disabled="lod" @click="handleEditImportInvoice('new')" type="submit" class="btn btn-primary">
                <i class="bi bi-file-earmark"></i> New
              </button>
              <button :disabled="lod" @click="handleEditImportInvoice('accepted')" type="submit" class="btn btn-success">
                <i class="bi bi-check-circle"></i> Accepted
              </button>
              <button :disabled="lod" @click="handleEditImportInvoice('canceled')" type="submit" class="btn btn-danger">
                <i  class="bi bi-x-circle"></i> Canceled
              </button>
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
import {getItem, removeItem, setItem} from "@/helpers/persistaneStorage.js";
import EditInvoiceButton from "@/ui-components/EditInvoiceButton.vue";
import {
  DeleteButton,
  DeleteInvoiceButton,
  EditButton,
  InputItemComponent,
  SaveButton, TableBottomComponent,
  TableHeaderComponent
} from "@/ui-components/index.js";

const store = useStore();
const importInvoices = computed(() => store.getters.allImportInvoice);
const suppliers = computed(() => store.getters.allSuppliers);
const productVariants = computed(() => store.getters.allProductVariants);
console.log('Product', productVariants)
const lod = computed(() => store.state.importInvoice.isLoadingImportInvoice);
const items = ref([]);
const newItem = ref({ variant: '', quantity: '', input_price: '' });
const storageKey = ref('');
const modal = ref('')
const editImportInvoice = ref({
  id: '',
  state: '',
  supplier: '',
  items: [],
});
const currentPage = computed(() => store.getters.currentPageImportInvoice);
const totalPages = computed(() => store.getters.totalPagesImportInvoice); // Fallback to 1
const totalEntries = computed(() => store.getters.totalCountImportInvoice);
const searchQuery = ref('');
const maxVisiblePages = 5;


onMounted(() => {
  store.dispatch('fetchImportInvoices');
  const savedItems = getItem(storageKey.value);
  if (savedItems) {
    items.value = savedItems;
  }
    store.dispatch('fetchProductVariants');
    store.dispatch('fetchSuppliers');

});

const openEditModal = (selectedImportInvoice) => {
  editImportInvoice.value = {
    id: selectedImportInvoice.id,
    state: selectedImportInvoice.state,
    supplier: selectedImportInvoice.supplier_data.supplier_id,
    items: selectedImportInvoice.imported_items.map(item => ({
      variant: item.variant_data.variant_id,
      quantity: item.quantity,
      input_price: item.input_price,
    })),
  };
  storageKey.value = `Items_${editImportInvoice.value.id}`;
  items.value = [...editImportInvoice.value.items];

  if (selectedImportInvoice.state === 'new') {
  setItem(storageKey.value, items.value)
  }

  const modalElement = document.getElementById('editImportInvoice');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const addItem = () => {
  const {variant, quantity, input_price} = newItem.value;

  if (!variant || !quantity || !input_price) {
    alert('Please fill in all fields.');
    return;
  }

  const existingItemIndex = items.value.findIndex(item => item.variant === variant);
  if (existingItemIndex !== -1) {
    items.value[existingItemIndex].quantity += parseInt(quantity);
  } else {
    items.value.push({variant, quantity: parseInt(quantity), input_price});
  }

  setItem(storageKey.value, items.value);
  newItem.value = {variant: '', quantity: '', input_price: ''};
};
const enableEditing = (index) => {
  items.value[index].isEditing = true;
};

const saveEditing = (index) => {
  items.value[index].isEditing = false;

  setItem(storageKey.value, items.value);
};

const deleteItem = (index) => {
  items.value.splice(index, 1);
  setItem(storageKey.value, items.value);
};

const handleEditImportInvoice = async (newState) => {
  editImportInvoice.value.state = newState
  await store.dispatch('editImportInvoice', {...editImportInvoice.value, items: items.value});
  await store.dispatch('fetchImportInvoices');
  if (store.getters.errorMessageImportInvoice.length === 0) {
    const bsModal = bootstrap.Modal.getInstance(modal.value);
    bsModal.hide()
  }
  removeItem(storageKey.value)
};

const getVariantName = (variantId) => {
  const variant = productVariants.value.find(v => v.id === variantId);
  return variant ? `${variant.product_data.product_name} (${variant.size_data.size_name || 'No size'})` : 'Unknown';
};
// const cancelEditing = () => {
//   removeItem(storageKey.value);
//   items.value = [];
//   const modalElement = document.getElementById('editImportInvoice');
//   const modal = bootstrap.Modal.getInstance(modalElement);
//   modal.hide();
// };

const totalPagesArray = computed(() => {
  const totalPagesValue = totalPages.value ;
  return Array.from({ length: totalPagesValue }, (_, i) => i + 1);
});


const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    store.dispatch('changePageImportInvoice', page);
  }
};

const search = () => {
  store.dispatch('searchImportInvoices', searchQuery.value);
};
</script>
