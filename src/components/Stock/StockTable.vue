<template>
    <!-- Sales Card -->
  <section class="section dashboard">
    <div class="row">
  <div class="col-lg-12">
    <div class="row">
    <div class=" col-md-4">
      <div class="card info-card sales-card bg-card">
        <div class="card-body">
          <h5 class="card-title text-">Total<span>|Money</span></h5>
          <div class="d-flex align-items-center">
            <div class="bg-green-accent-1 card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-currency-dollar"></i>
            </div>
            <div class="ps-3">
              <p class="card-text display-6">
                <span class="badge bg-green-accent-1">
                {{ formattedTotalMoney }}
              </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div><!-- End Sales Card -->
      <div class=" col-md-4">
        <div class="card info-card sales-card bg-card1">
          <div class="card-body">
            <h5 class="card-title"><span>Total|</span>Product<span>|Quantity</span></h5>
            <div class="d-flex align-items-center">
              <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi  bi-grid-3x3-gap-fill"></i>
              </div>
              <div class="ps-3">
                <p class="card-text display-6">{{ sums.total_quantity }}</p>
              </div>
            </div>
          </div>
        </div>
      </div><!-- End Sales Card -->
      <div class=" col-md-4">
        <div class="card info-card sales-card bg-card3">
          <div class="card-body">
            <h5 class="card-title">Total<span>|Items</span></h5>
            <div class="d-flex align-items-center">
              <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-basket"></i>
              </div>
              <div class="ps-3">
                <p class="card-text display-6">{{ sums.total_items }}</p>
              </div>
            </div>
          </div>
        </div>
      </div><!-- End Sales Card -->

    </div>
  </div>
    </div>
  </section>


    <!-- Stock Table -->
    <div class="card mt-4">
      <div class="card-body ">
        <h5 class="card-title">Stock List</h5>
        <table class="table datatable">
          <thead>
          <tr>
            <th>ID</th>
            <th>Product Variant</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="stock in stocks" :key="stock.id">
            <td>{{ stock.id }}</td>
            <td>{{ stock.variant_data.variant_info}}</td>
            <td>{{ stock.price }}</td>
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
const stocks = computed(() => store.getters.allStocks);

onMounted(() => {
  store.dispatch('fetchStocks');
});

const formattedTotalMoney = computed(() => sums.value.total_money);

function formatCurrency(value) {
  return new Intl.NumberFormat('uz-UZ', { style: 'currency',minimumFractionDigits: 0 , currency: 'UZS'})
      .format(value)
}

</script>

<style scoped>
.card-text {
  font-weight: bold;
}
.bg-purple {
  //background-color: #6f42c1 !important;
  color: #4154f1 !important;
}
.bg-card{
  background-color: #e6fff2 !important;
}
.bg-card1{
  background-color: #ffffb3 !important;
}
.bg-card3{
  background-color: #ffc2b3 !important;
}


</style>
