<template>
  <div class="row mp-3 mb-3">
    <label class="col-sm-2 col-form-label" for="size">{{ label }}</label>
    <div class="col-sm-10">
      <select
          v-model="localValue"
          :disabled="disabled"
          class="form-control"
      >
        <option :value="null" disabled>{{ placeholder }}</option>
        <option v-for="item in items" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
      <p v-if="error" class="text-danger">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  items: [Object],
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  error: String,
  disabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

