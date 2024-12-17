<!-- Supplier.vue -->
<template>
  <div class="modal fade" id="addSupplier" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Supplier</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddSupplier">
            <InputItemComponent label="Name" type="text" placeholder="Name" v-model="newSupplier.name" />
            <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
            <InputItemComponent label="Phone Number" type="text" placeholder="Phone Number" v-model="newSupplier.phone_number" />
            <p v-if="errors.phone_number" class="text-danger">{{ errors.phone_number[0] }}</p>

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
const errors = computed(() => store.getters.getErrorSupplier);
const lod = computed(() => store.state.supplier.isLoadingSupplier);
const newSupplier = ref({
  name: '',
  phone_number: '',
});
const modal = ref('');

const handleAddSupplier = async () => {
  await store.dispatch('addSupplier', newSupplier.value);
  newSupplier.value = {
    name: '',
    phone_number: ''
  };
  await store.dispatch('fetchSuppliers');
  if (store.getters.errorMessageSupplier.length === 0) {
    const bsModal = bootstrap.Modal.getInstance(modal.value);
    bsModal.hide()
  }
};
</script>
