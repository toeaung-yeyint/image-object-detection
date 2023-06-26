<template>
  <div class="flex items-center">
    <div class="flex-grow flex">
      <label
        class="example font-medium text-base mr-4 flex-grow bg-gray-50 p-2 cursor-pointer"
        for="imageInput"
      >
        <i class="fa-solid fa-paperclip text-base"></i> | Image input (png,
        jpg)</label
      >
      <input class="hidden" type="file" id="imageInput" />
    </div>
    <div>
      <button
        class="bg-sky-600 outline-0 border-0 px-8 py-2 cursor-pointer text-white text-base"
      >
        Detect
      </button>
      <button
        class="bg-red-600 outline-0 border-0 px-8 py-2 cursor-pointer text-white ml-4 text-base"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.example {
  border-bottom: 1px solid black;
}
</style>