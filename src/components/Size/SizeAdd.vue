<!-- Size.vue -->
<template>
  <div class="modal fade" id="addSize" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Size</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddSize">
            <InputItemComponent label="Name" type="text" placeholder="Name" v-model="newSize.name" />
            <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
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
const errors = computed(() => store.getters.getErrorSize);
const lod = computed(() => store.state.size.isLoadingSize);
const newSize = ref({ name: '' });
const modal = ref('');

const handleAddSize = async () => {
  await store.dispatch('addSize', newSize.value);
  newSize.value = { name: '' };
  await store.dispatch('fetchSizes');
  if (store.getters.errorMessageSize.length === 0) {
    const bsModal = bootstrap.Modal.getInstance(modal.value);
    bsModal.hide();
  }
};
</script>
