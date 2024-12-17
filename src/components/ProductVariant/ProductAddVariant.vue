<template>
  <div class="modal fade" ref="modal" id="addProductVariant" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Product Variant</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddVariant">



            <SelectItemComponent
                v-model="newVariant.product"
                :items="products"
                label="Product"
                placeholder="Select a product"
                :error="errors.product?.[0]"
            />

            <SelectItemComponent
                v-model="newVariant.size"
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
import {SelectItemComponent} from "@/ui-components/index.js";

const store = useStore();

const errors = computed(() => store.getters.getProductVariantErrors);
const lod = computed(() => store.state.productVariant.isLoadingVariant);
const products = computed(() => store.getters.allProducts);
const sizes = computed(() => store.getters.allSizes);

const newVariant = ref({
  product: '',
  size: ''
});
const modal = ref('')
const handleAddVariant = async () => {
  await store.dispatch('addProductVariant', newVariant.value);
  newVariant.value = { product: '', size: '' };
  if (store.getters.getProductVariantErrorMessage.length === 0) {
    const bsModal = bootstrap.Modal.getInstance(modal.value);
    bsModal.hide()
  }
};

onMounted(async () => {
  await store.dispatch('fetchProducts');
  await store.dispatch('fetchSizes');
});
</script>
