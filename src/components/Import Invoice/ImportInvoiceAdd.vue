
<template>
  <div class="modal fade" id="addImportInvoice" ref="modal" tabindex="-1">
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
            <form @submit.prevent="handleAddImportInvoice">
              <div class="row mp-3 mb-3">
                <label class="col-form-label" for="supplier"><b>Supplier</b></label>
                <div class="col-sm-10">
                  <select v-model="newImportInvoice.supplier" class="form-control w-50">
                    <option disabled value="">Select a supplier</option>
                    <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
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
                  <th>Actions</th>
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
                  <select v-model="newImportInvoice.items.variant" class="form-control">
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
                         v-model="newImportInvoice.items.quantity"
                         @keydown.enter.prevent="addItem"
                  />
                </div>
                <div class="col-md-4">
                  <input
                      type="number"
                      class="form-control"
                      placeholder="Price"
                      v-model="newImportInvoice.items.input_price"
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
                <button    type="submit" :disabled="lod" class="btn btn-primary">Save changes</button>
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
import {DeleteInvoiceButton, MessageNotification, SaveButton} from "@/ui-components/index.js";
import EditInvoiceButton from "@/ui-components/EditInvoiceButton.vue";
import importInvoice from "@/moduls/importInvoice.js";


const errorMessage = ref('')
const store = useStore();
const productVariants = computed(() => store.getters.allProductVariants);
const suppliers = computed(() => store.getters.allSuppliers);
const errors = computed(() => store.getters.getErrorImportInvoice);
const lod = computed(() => store.state.importInvoice.isLoadingImportInvoice)
const modal = ref('')
const getVariantName = (variantId) => {
  if (!variantId) return '';
  const variant = productVariants.value.find(v => v.id === variantId);
  if (!variant || !variant.product_data) return 'Unknown';
  return `${variant.product_data.product_name} (${variant.size_data.size_name || 'No size'})`;
};




const newImportInvoice = ref({
  supplier: '',
  items: {
    variant: '',
    quantity: '',
    input_price: '',
  }

});

const items = ref(getItem('Items') || []);

const addItem = () => {
  const { variant, quantity, input_price } = newImportInvoice.value.items;

  if (!variant || !quantity || !input_price) {
    switch (true) {
      case !variant:
        errorMessage.value = 'Variant is required';
        break;
      case !quantity:
        errorMessage.value = 'Quantity is required';
        break;
      case !input_price:
        errorMessage.value = 'Input price is required';
        break;
    }
    clearError(errorMessage)
    return;
  }



  const existingItemIndex = items.value.findIndex(item => item.variant === variant);


  if (existingItemIndex !== -1) {

    items.value[existingItemIndex].quantity += parseInt(quantity);
  } else {

    items.value.push({ variant, quantity: parseInt(quantity), input_price });
  }

  setItem('Items', items.value);

  newImportInvoice.value.items = { variant: '', quantity: '', input_price: '' };
};

const handleAddImportInvoice = async () => {
  if (!newImportInvoice.value.supplier || items.value.length === 0) {
    errorMessage.value = 'Supplier error';
    clearError(errorMessage)
    return;
  }
  const data = {
    supplier: newImportInvoice.value.supplier,
    items: items.value
  };
  await store.dispatch('addImportInvoice', data);
  await store.dispatch('fetchImportInvoices');

  if (store.getters.errorMessageImportInvoice.length === 0) {
    const bsModal = bootstrap.Modal.getInstance(modal.value);
    bsModal.hide()
  }
  removeItem('Items');
  items.value = [];
  newImportInvoice.value.supplier = '';
}
//end handel

const enableEditing = (index) => {
  items.value[index].isEditing = true;
};

const saveEditing = (index) => {
  items.value[index].isEditing = false;

  setItem('Items', items.value);
};
const deleteItem = (index) => {
  items.value.splice(index, 1);
  setItem('Items', items.value);
};

onMounted(async () => {

  await store.dispatch('fetchSuppliers');
  await store.dispatch('fetchProductVariants');
});
const clearError = (errorMessage) => {
  setTimeout(() => {
    errorMessage.value = '';
  }, 3000)
}
</script>

