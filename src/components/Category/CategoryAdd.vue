<!-- ProductAddVariant.vue -->
<template>
  <div class="modal fade" id="addModal" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Category</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddCategory">
            <InputItemComponent label="Name" type="text" placeholder="Name" v-model="newCategory.name" />
            <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
            <InputItemComponent label="Description" type="text" placeholder="Description" v-model="newCategory.description" />
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
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import InputItemComponent from "@/ui-components/InputItemComponent.vue";

const store = useStore();
const errors = computed(() => store.getters.getErrorsCategory);
const lod = computed(() => store.state.category.isLoadingCategory);

const newCategory = ref({
  name: '',
  description: ''
});
const modal = ref()

const handleAddCategory = async () => {
  await store.dispatch('addCategory', newCategory.value);
    if (store.getters.errorMessageCategory.length === 0) {
      const bsModal = bootstrap.Modal.getInstance(modal.value);
      bsModal.hide()
    }
    newCategory.value = { name: '', description: '' }
};
</script>
