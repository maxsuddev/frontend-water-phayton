<!-- User.vue -->
<template>
  <div class="modal fade" id="addUser" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add User</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddUser">
            <InputItemComponent label="User Name" type="text" placeholder="User Name" v-model="newUser.username" />
            <p v-if="errors.username" class="text-danger">{{ errors.username[0] }}</p>
            <InputItemComponent label="First Name" type="text" placeholder="First Name" v-model="newUser.first_name" />
            <p v-if="errors.first_name" class="text-danger">{{ errors.first_name[0] }}</p>
            <InputItemComponent label="Last name" type="text" placeholder="Last Name" v-model="newUser.last_name" />
            <p v-if="errors.last_name" class="text-danger">{{ errors.last_name[0] }}</p>
            <InputItemComponent label="Password" type="password" placeholder="Password" v-model="newUser.password" />
            <p v-if="errors.password" class="text-danger">{{ errors.password[0] }}</p>
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
const errors = computed(() => store.getters.getErrorUser);
const lod = computed(() => store.state.user.isLoadingUser);
const newUser = ref({
  username: '',
  first_name: '',
  last_name: '',
  password: ''
});
const modal = ref('');

const handleAddUser = async () => {
  await store.dispatch('addUser', newUser.value);
  newUser.value = {
    username: '',
    first_name: '',
    last_name: '',
    password: ''
  };
  if (store.getters.errorMessageUser.length === 0) {
    const bsModal = bootstrap.Modal.getInstance(modal.value);
    bsModal.hide()
  }
};
</script>
