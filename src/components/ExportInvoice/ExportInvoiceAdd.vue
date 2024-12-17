
<template>
  <div class="modal fade" id="addExportInvoice" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Full Screen Modal</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <MessageNotification
            v-if="errorMessage"
            :message="errorMessage"
        />
        <div>
          <div class="modal-body">
            <form @submit.prevent="handleAddExportInvoice">
              <div class="row mp-3 mb-3">
                <label class="col-form-label" for="supplier"><b>Clients</b></label>
                <div class="col-sm-10">
                  <select v-model="newExportInvoice.client" class="form-control w-50">
                    <option disabled value="">Select a supplier</option>
                    <option v-for="client in clients" :key="client.id" :value="client.id">
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
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ getVariantName(item.product_variant_id) }}</td>
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
                    <EditInvoiceButton
                        v-if="!item.isEditing"
                        @click="enableEditing(index)"
                        type="button"
                    >
                      Edit
                    </EditInvoiceButton>
                    <SaveButton
                        v-else
                        @click="saveEditing(index)"
                        type="button"
                    >
                      Save
                    </SaveButton>
                    <DeleteInvoiceButton @click="deleteItem(index)" type="button" >
                      Remove
                    </DeleteInvoiceButton>
                  </td>
                </tr>
                </tbody>
              </table>


              <div class="row mp-3 mb-3 align-items-center">
                <div class="col-md-4">
                  <select v-model="newExportInvoice.items.product_variant_id" class="form-control">
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
                  <input type="number"
                         class="form-control"
                         placeholder="Quantity"
                         v-model="newExportInvoice.items.quantity"
                         @keydown.enter.prevent="addItem"
                  />
                </div>
                <div class="col-md-4">
                  <input
                      type="number"
                      class="form-control"
                      placeholder="Price"
                      v-model="newExportInvoice.items.price"
                      @keydown.enter.prevent="addItem"
                  />
                </div>
              </div>
              <button type="button"
                      class="btn btn-secondary"
                      @click="addItem"
                      @keydown.enter.prevent="addItem"
              >Add Item</button>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button    type="submit"
                           class="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import {getItem, removeItem, setItem} from "@/helpers/persistaneStorage.js";
import {DeleteInvoiceButton, MessageNotification, SaveButton, EditInvoiceButton} from "@/ui-components/index.js";


const errorMessage = ref('')
const store = useStore();
const productVariants = computed(() => store.getters.allProductVariants);
const clients = computed(() => store.getters.allClient);
const errors = computed(() => store.getters.getErrorExportInvoice);
const modal = ref('')

const getVariantName = (variantId) => {
  if (!variantId) return '';
  const variant = productVariants.value.find(v => v.id === variantId);
  if (!variant || !variant.product_data) return 'Unknown';
  return `${variant.product_data.product_name} (${variant.size_data.size_name || 'No size'})`;
};




const newExportInvoice = ref({
  client: '',
  items: {
    product_variant_id: '',
    quantity: '',
    price: '',
  }

});

const items = ref(getItem('Export Items') || []);

const addItem = () => {
  const { product_variant_id, quantity, price } = newExportInvoice.value.items;

  if (!product_variant_id || !quantity || !price) {
    switch (true) {
      case !product_variant_id:
        errorMessage.value = 'Variant is required';
        break;
      case !quantity:
        errorMessage.value = 'Quantity is required';
        break;
      case !price:
        errorMessage.value = 'Input price is required';
        break;
    }
    clearError(errorMessage)
    return;
  }



  const existingItemIndex = items.value.findIndex(item => item.product_variant_id === product_variant_id);


  if (existingItemIndex !== -1) {

    items.value[existingItemIndex].quantity += parseInt(quantity);
  } else {

    items.value.push({ product_variant_id, quantity: parseInt(quantity), price });
  }

  setItem('Export Items', items.value);

  newExportInvoice.value.items = { product_variant_id: '', quantity: '', price: '' };
};

const handleAddExportInvoice = async () => {
  if (!newExportInvoice.value.client || items.value.length === 0) {
    errorMessage.value = 'Supplier error';
    clearError(errorMessage)
    return;
  }
  const data = {
    state: 'new',
    client: newExportInvoice.value.client,
    items: items.value
  };
  await store.dispatch('addExportInvoice', data);
  await store.dispatch('fetchExportInvoices');

  if (store.getters.errorMessageExportInvoice.length === 0) {
    const bsModal = bootstrap.Modal.getInstance(modal.value);
    bsModal.hide()
  }
  removeItem('Export Items');
  items.value = [];
  newExportInvoice.value.client = '';
}
//end handel

const enableEditing = (index) => {
  items.value[index].isEditing = true;
};

const saveEditing = (index) => {
  items.value[index].isEditing = false;

  setItem('Export Items', items.value);
};
const deleteItem = (index) => {
  items.value.splice(index, 1);
  setItem('Export Items', items.value);
};

onMounted(async () => {

  await store.dispatch('fetchClients');
  await store.dispatch('fetchProductVariant');
});
const clearError = (errorMessage) => {
  setTimeout(() => {
    errorMessage.value = '';
  }, 3000)
}
</script>

