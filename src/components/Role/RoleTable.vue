<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Roles</h5>
        <table class="table datatable">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td>{{ role.id }}</td>
            <td>{{ role.name }}</td>
            <td>
              <label
                  v-for="permission in role.permissions"
                  :key="permission.id"
                  class="badge bg-primary mx-1 ">
                {{ permission.name }}
              </label>

            </td>
            <td>
              <EditButton :onEdit="() => openEditModal(role)" />
              <DeleteButton :onDelete="() => deleteRole(role.id)" :isLoading="lod" />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="editRole" ref="modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Role</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleEditRole">
              <InputItemComponent label="Role Name" type="text" placeholder="Enter Role Name" v-model="name" />
              <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>

              <!-- Permissions Multiple Select -->
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label" for="permissionsSelect">Permissions</label>
                <div class="col-sm-10">
                  <select
                      multiple
                      class="form-control"
                      v-model="selectedPermissions"
                      aria-label="Select permissions"
                  >
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import InputItemComponent from "@/ui-components/InputItemComponent.vue";
import { DeleteButton, EditButton } from "@/ui-components/index.js";

const store = useStore();
const roles = computed(() => store.getters.allRoles);
const permissions = computed(() => store.getters.allPermission);
const errors = computed(() => store.getters.getErrorRole);
const lod = computed(() => store.state.rolePermission.isLoadingRole);

const name = ref('');
const selectedPermissions = ref([]);
const role = ref('');
const modal = ref('');

onMounted(() => {
  store.dispatch('fetchRoles');
  store.dispatch('fetchPermissions');
});

const openEditModal = (selectedRole) => {
  role.value = selectedRole;
  name.value = selectedRole.name;
  selectedPermissions.value = selectedRole.permissions.map((perm) => perm.id);

  const modalElement = document.getElementById('editRole');
  const modalInstance = new bootstrap.Modal(modalElement);
  modalInstance.show();
};

const handleEditRole = async () => {
  if (role.value && role.value.id) {
    await store.dispatch('editRole', {
      id: role.value.id,
      name: name.value,
      permissions: selectedPermissions.value,
    });

    await store.dispatch('fetchRoles');

    if (!store.getters.errorMessageRole.length) {
      const bsModal = bootstrap.Modal.getInstance(modal.value);
      bsModal.hide();
    }
  } else {
    console.error("Role ID is missing.");
  }
};

const deleteRole = async (roleId) => {
  if (confirm('Are you sure you want to delete this role?')) {
    await store.dispatch('deleteRole', roleId);
    await store.dispatch('fetchRoles');
  }
};
</script>
