<template>
  <div class="modal fade" id="addRole" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Role</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddRole">
            <InputItemComponent label="Role Name" type="text" placeholder="Enter Role Name" v-model="newRole.name" />
            <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>

            <!-- Permissions Multiple Select -->
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label" for="permissions">Permissions</label>
              <div class="col-sm-10">
                <select v-model="newRole.permissions"
                        multiple
                        class="form-control" aria-label="Select permissions">
                  <option v-for="permission in permissions" :key="permission.id" :value="permission.id">
                    {{ permission.name }}
                  </option>
                </select>
              </div>
              <p v-if="errors.permissions" class="text-danger">{{ errors.permissions[0] }}</p>
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
import {ref, computed, onMounted} from 'vue';
import {useStore} from 'vuex';
import InputItemComponent from "@/ui-components/InputItemComponent.vue";

const store = useStore();

const errors = computed(() => store.getters.getErrorRole);
const lod = computed(() => store.state.rolePermission.isLoadingRole);

const permissions = computed(() => store.getters.allPermission);

const newRole = ref({
  name: '',
  permissions: []
});

const modal = ref();

const handleAddRole = async () => {
  try {
    await store.dispatch('addRole', newRole.value);
    newRole.value = {name: '', permissions: []};
    await store.dispatch('fetchRoles');

    if (!store.getters.errorMessageRole.length) {
      const bsModal = bootstrap.Modal.getInstance(modal.value);
      bsModal.hide();
    }
  } catch (error) {
    console.error('Error adding role:', error);
  }
};

onMounted(async () => {
  await store.dispatch('fetchPermissions');
});
</script>
