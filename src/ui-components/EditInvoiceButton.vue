<template>
  <button class="me-3" @click="onEdit">
    <i style="font-size: 30px" class="text-primary  bx   bxs-edit-alt"></i>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  onEdit: Function,
});
</script>

