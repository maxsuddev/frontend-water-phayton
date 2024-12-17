<template>
  <button :disabled="isLoading" @click="onDelete">
    <i style="font-size: 20px" class="text-danger ri-delete-bin-5-fill"></i>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  onDelete: Function,
  isLoading: Boolean,
});
</script>

