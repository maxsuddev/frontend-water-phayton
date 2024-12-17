<template>
  <div class="modal fade" id="addProduct" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddProduct">
            <InputItemComponent label="Name" type="text" placeholder="Name" v-model="newProduct.name" />
            <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
            <InputItemComponent label="Description" type="text" placeholder="Description" v-model="newProduct.description" />

            <div class="row mp-3">
              <label class="col-sm-2 col-form-label" for="size">Category</label>
              <div class="col-sm-10">
                <select v-model="newProduct.category" class="form-control" aria-label="Select size">
                  <option disabled value="">Select a category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            <p v-if="errors.name" class="text-danger">{{ errors.category[0] }}</p>
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

const store = useStore();
const errors = computed(() => store.getters.getErrorProduct);
const lod = computed(() => store.state.product.isLoadingProduct);
const categories = computed(() => store.getters.allCategories);

const newProduct = ref({
  name: '',
  description: '',
  category: ''
});
const modal = ref()

const handleAddProduct = async () => {
  await store.dispatch('addProduct', newProduct.value);
  newProduct.value = { name: '', description: '', category: '' };
  await store.dispatch('fetchProducts');
  if (store.getters.errorMessageProduct.length === 0) {
    const bsModal = bootstrap.Modal.getInstance(modal.value);
    bsModal.hide()
  }
};

onMounted(async () => {
  await store.dispatch('fetchProducts')
  await store.dispatch('fetchCategories');
});
</script>