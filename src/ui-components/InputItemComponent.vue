<template>
  <div class="row mb-3">
    <label :for="label" class="col-sm-2 col-form-label">{{ label }}</label>
    <div class="col-sm-10">
      <input
          :type="type"
          class="form-control"
          :id="label"
          :placeholder="placeholder"
          @input="onInputUpdate"
          :value="modelValue"
      />
      <!-- Xatolikni chiqarish -->
      <p v-if="errors" class="text-danger">
        {{ errors }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  modelValue: [String, Number],
  errors: String, // Xatoni bitta satr sifatida olish
});

const emit = defineEmits(['update:modelValue']);

const onInputUpdate = (e) => {
  emit('update:modelValue', e.target.value);
};
</script>
