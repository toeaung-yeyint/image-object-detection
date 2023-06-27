<template>
  <div class="mb-3 text-center font-medium text-gray-400">Detecting</div>
  <div class="h-1 w-full bg-gray-300 overflow-hidden">
    <p class="h-1 w-32 bg-blue-500 loading"></p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.loading {
  animation: loading 1s linear infinite;
}
@keyframes loading {
  100% {
    transform: translateX(800%);
  }
}
</style>