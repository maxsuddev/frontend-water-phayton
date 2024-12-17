<template>
  <button class="me-3" @click="onEdit">
    <i style="font-size: 30px" class="text-primary  bx bx-task"></i>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  onEdit: Function,
});
</script>

<style scoped>
/* Qo'shimcha style kerak bo'lsa shu yerda yozing */
</style>
