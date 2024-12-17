<template>
  <TableHeaderComponent
      v-model:searchQuery="searchQuery"
      @search="searchUsers"
  />

  <div class="datatable-container">
    <table class="table datatable datatable-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>User Name</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.name }}</td>
        <td>
          <EditButton :onEdit="() => openEditModalUser(user)" />
          <DeleteButton :onDelete="() => deleteUser(user.id)" :isLoading="isLoadingUser" />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <TableBottomComponent
      :totalEntries="totalEntries"
      :currentPage="currentPage"
      :totalPagesArray="totalPagesArray"
      :maxVisiblePages="maxVisiblePages"
      :totalPages="totalPages"
      @page-change="changePage"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { DeleteButton, TableBottomComponent, TableHeaderComponent, EditButton } from '@/ui-components/index.js';

const store = useStore();
const users = computed(() => store.getters.allUsers || []); // Fallback to empty array
const currentPage = computed(() => store.getters.currentPage);
const totalPages = computed(() => store.getters.totalPages || 1); // Fallback to 1
const totalEntries = computed(() => store.getters.totalCount);
const isLoadingUser = computed(() => store.state.isLoadingUser);
const searchQuery = ref('');
const maxVisiblePages = 5;

const totalPagesArray = computed(() => {
  const totalPagesValue = totalPages.value ;
  return Array.from({ length: totalPagesValue }, (_, i) => i + 1);
});



onMounted(() => {
  store.dispatch('fetchUsers');
});

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    store.dispatch('changePage', page);
  }
};

const searchUsers = () => {
  store.dispatch('searchUsers', searchQuery.value);
};

const openEditModalUser = (selectedUser) => {
  // Modal ochish funksiyasi
};

const deleteUser = async (userId) => {
  confirm(`Are you sure you want to delete ${userId} user?`);
  await store.dispatch('deleteUser', userId);
  await store.dispatch('fetchUsers');
};
</script>

<style scoped>
.card-title h5 {
  margin: 0; /* Qo‘shimcha bo‘shliqlarni olib tashlash */
  font-size: 18px;
}
</style>
