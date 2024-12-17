<!-- Client.vue -->
<template>
  <div class="modal fade" id="addClient" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Client</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddClient">
            <InputItemComponent label="Name" type="text" placeholder="Name" v-model="newClient.name" />
            <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
            <InputItemComponent label="Description" type="text" placeholder="Description" v-model="newClient.description" />
            <InputItemComponent label="Phone" type="text" placeholder="Phone" v-model="newClient.phone" />
            <p v-if="errors.phone" class="text-danger">{{ errors.phone[0] }}</p>
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

const errors = computed(() => store.getters.getErrorClient);
const lod = computed(() => store.state.client.isLoadingClient);
const newClient = ref({
  name: '',
  description: '',
  phone: ''
});
const modal = ref('');

const handleAddClient = async () => {
  await store.dispatch('addClient', newClient.value);
  newClient.value = {
    name: '',
    description: '',
    phone: ''
  };
  await store.dispatch('fetchClients');
  if (store.getters.errorMessageClient.length === 0) {
    const bsModal = bootstrap.Modal.getInstance(modal.value);
    bsModal.hide()
  }
};
</script>
