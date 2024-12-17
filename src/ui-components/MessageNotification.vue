<template>
  <div
      aria-live="polite"
      aria-atomic="true"
      class="position-fixed top-0 end-0 p-3"
      style="z-index: 1050;"
  >

  <div
      v-if="message"
      class="toast align-items-center text-bg-primary border-0 show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true">
    <div class="toast-header">
      <img src="./../../public/img/favicon.png" class="rounded me-2" alt="...">
      <strong class="me-auto">{{APP_NAME}} says</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {{ message}}    </div>
  </div>

    <div
        v-if="errorMessage"
        class="toast align-items-center text-bg-danger border-0 show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
      <div class="toast-header">
        <img src="./../../public/img/favicon.png" class="rounded me-2" alt="...">
        <strong class="me-auto">{{ APP_NAME }} says </strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        {{ errorMessage}}    </div>
    </div>
  </div>



</template>

<script setup>
import { APP_NAME } from './../constants/constants.js';

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
});



</script>

<style scoped>
/* Optional Toast Styling */
.toast {
  animation: slideInRight 0.5s ease-in-out;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
