<template>
  <button class="me-3" @click="onEdit">
    <i style="font-size: 20px" class="text-primary ri-edit-2-fill"></i>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  onEdit: Function,
});
</script>


