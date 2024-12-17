<!-- MainComponent.vue -->
<template>

  <main id="main" class="main">
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Stock Tables</h1>
    </div>

    <section class="section">
      <StockMovementTable/>
    </section>
  </main>
</template>

<script setup>



import StockMovementTable from "@/components/StockMovement/StockMovementTable.vue";
</script>
