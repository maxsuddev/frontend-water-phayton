<template>
  <div>
    <!-- Export Invoice Table -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Export Invoice</h5>
        <table class="table datatable">
          <thead>
          <tr>
            <th>ID</th>
            <th>Client Name</th>
            <th>State</th>
            <th>By User</th>
          </tr>
          </thead>
          <tbody>
          <tr style="cursor: pointer" v-for="exportInvoice in exportInvoices" :key="exportInvoice.id" @click="openEditModal(exportInvoice)">
            <td>{{ exportInvoice.id }}</td>
            <td>{{ exportInvoice.client_data.client_name }}</td>
            <td>{{ exportInvoice.state }}</td>
            <td>{{ exportInvoice.user_data.username }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" ref="modal" id="editExportInvoice" tabindex="-1">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Export Invoice</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleEditExportInvoice">
              <div class="row mb-3">
                <label class="col-form-label" for="supplier"><b>Supplier</b></label>
                <div class="col-sm-10">
                  <select v-model="editExportInvoice.client" class="form-control w-50">
                    <option disabled value="">Select a client</option>
                    <option v-for="client in clients"
                            :key="client.id"
                            :value="client.id">
                            {{ client.name }}
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
                  <th v-if="editExportInvoice.state === 'new'" >Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.variant.product_data.product_name  }}</td>
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
                    <span v-if="!item.isEditing">{{ item.price }}</span>
                    <input
                        v-else
                        type="number"
                        v-model="item.price"
                        class="form-control"
                    />
                  </td>
                  <td>
                    <span v-if="editExportInvoice.state === 'new'">
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

              <div v-if="editExportInvoice.state === 'new'" class="row mb-3 align-items-center">
                <div class="col-md-4">
                  <select v-model="newItem.product_variant_id" class="form-control">
                    <option disabled value="">Select a product</option>
                    <option v-for="product in productVariants"
                            :key="product.id"
                            :value="product.id"
                            @keydown.enter.prevent="addItem"
                    >
                      {{ product.product_data.product_name }}
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
                      v-model="newItem.price"
                      @keydown.enter.prevent="addItem"
                  />
                </div>
              </div>
              <button v-if="editExportInvoice.state === 'new'"
                      type="submit"
                      class="btn btn-secondary"
                      @keydown.enter.prevent="addItem"
                      @click="addItem">
                <i class="bi bi-plus-circle"></i> Add Item
              </button>
              <div v-if="editExportInvoice.state === 'new'"  class="modal-footer">
                <!--                <button :disabled="lod" @click="cancelEditing" type="button" class="btn btn-secondary" data-bs-dismiss="modal">-->
                <!--                  <i class="bi bi-x-circle"></i> Close-->
                <!--                </button>-->
                <button :disabled="lod" @click="handleEditExportInvoice('new')" type="submit" class="btn btn-primary">
                  <i class="bi bi-file-earmark"></i> New
                </button>
                <button :disabled="lod" @click="handleEditExportInvoice('accepted')" type="submit" class="btn btn-success">
                  <i class="bi bi-check-circle"></i> Accepted
                </button>
                <button :disabled="lod" @click="handleEditExportInvoice('canceled')" type="submit" class="btn btn-danger">
                  <i  class="bi bi-x-circle"></i> Canceled
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import {getItem, removeItem, setItem} from "@/helpers/persistaneStorage.js";
import {DeleteInvoiceButton, SaveButton, EditInvoiceButton} from "@/ui-components/index.js";

const store = useStore();
const exportInvoices = computed(() => store.getters.allExportInvoice);
const clients = computed(() => store.getters.allClient);
const productVariants = computed(() => store.getters.allProductVariants);
const lod = computed(() => store.state.exportInvoice.isLoadingExportInvoice);
const items = ref([]);
const newItem = ref({ product_variant_id: '', quantity: '', price: '' });
const storageKey = ref('');
const modal = ref('')
const editExportInvoice = ref({
  id: '',
  state: '',
  client: '',
  items: [],
});



onMounted(() => {
  store.dispatch('fetchExportInvoices');
  const savedItems = getItem(storageKey.value);
  if (savedItems) {
    items.value = savedItems;
  }
  store.dispatch('fetchProductVariants')
});

const openEditModal = (selectedExportInvoice) => {
  editExportInvoice.value = {
    id: selectedExportInvoice.id,
    state: selectedExportInvoice.state,
    supplier: selectedExportInvoice.client_data.client_id,
    items: selectedExportInvoice.exported_items.map(item => ({
      variant: item.variant_data.variant_id,
      quantity: item.quantity,
      price: item.price,
    })),
  };
  storageKey.value = `Export_${editExportInvoice.value.id}`;
  items.value = [...editExportInvoice.value.items];

  if (selectedExportInvoice.state === 'new') {
    setItem(storageKey.value, items.value)
  }

  const modalElement = document.getElementById('editExportInvoice');
  const modal = new bootstrap.Modal(modalElement,{
    backdrop: 'static',
    keyboard: true
  });
  modal.show();
  modalElement.focus();
};

const addItem = () => {
  const {variant, quantity, price} = newItem.value;

  if (!variant || !quantity || !price) {
    alert('Please fill in all fields.');
    return;
  }

  const existingItemIndex = items.value.findIndex(item => item.variant === variant);
  if (existingItemIndex !== -1) {
    items.value[existingItemIndex].quantity += parseInt(quantity);
  } else {
    items.value.push({variant, quantity: parseInt(quantity), price});
  }

  setItem(storageKey.value, items.value);
  newItem.value = {variant: '', quantity: '', price: ''};
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

const handleEditExportInvoice = async (newState) => {
  editExportInvoice.value.state = newState
  await store.dispatch('editExportInvoice', {...editExportInvoice.value, items: items.value});
  await store.dispatch('fetchExportInvoices');
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
</script>
