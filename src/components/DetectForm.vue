<template>
  <form @submit.prevent="detect" class="flex flex-col mb-32">
    <div class="border border-neutral-400 relative flex-grow rounded mb-6">
      <label
        class="absolute -top-4 left-8 bg-white px-2 font-semibold"
        for="imageInput"
        ><i class="fa-solid fa-image"></i> Image input:
      </label>
      <input
        ref="inputImage"
        class="px-10 w-full pt-6 pb-4"
        type="file"
        id="imageInput"
        accept=".jpg, .jpeg, .png, .webp"
        required
      />
    </div>
    <div class="flex items-center justify-between px-4">
      <div>
        <label for="models">Select a model: </label>
        <select
          class="border border-neutral-400"
          id="models"
          v-model="model"
          required
        >
          <option value="">-</option>
          <option value="cocossd">CocoSsd</option>
          <option value="yolo">YOLO</option>
        </select>
      </div>
      <div>
        <button
          class="px-8 py-2 bg-gray-600 text-white mr-4 uppercase hover:bg-black"
          type="submit"
        >
          Detect
        </button>
        <button
          @click="$emit('reset')"
          class="px-8 py-2 bg-red-500 text-white uppercase hover:bg-red-600"
          type="reset"
        >
          Reset
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits();

const inputImage = ref(null);

const model = ref("");

const detect = () => {
  emit("detect", { inputImage, model });
  inputImage.value.value = "";
  model.value = "";
};
</script>



