<template>
  <!-- Stock Table -->
    <div class="card mt-4">
      <div class="card-body">
        <h5 class="card-title">Stock List</h5>
        <table class="table datatable">
          <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Product Variant</th>
            <th>Type</th>
            <th>Quantity</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="stock in stockMovements" :key="stock.id">
            <td>{{ stock.id }}</td>
            <td> {{ stock.description }}</td>
            <td> {{ stock.variant_data.variant_info }}</td>
            <td>{{ stock.type}}</td>
            <td>{{ stock.quantity }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const sums = computed(() => store.getters.getSummary);
const stockMovements = computed(() => store.getters.getStockMovements);

onMounted(() => {
  store.dispatch('fetchStockMovements');
});




</script>

<style scoped>


</style>
