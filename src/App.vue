<template>
  <div class="max-w-screen-lg my-28 mx-auto px-8">
    <h1 class="uppercase text-center mb-12 text-3xl font-bold">
      image-object-detection
    </h1>
    <p class="mb-5">
      <strong>Built using:</strong> Vue, Composition API, ml5.js, HTML, Tailwind
      CSS, Vite
    </p>
    <p class="mb-20">
      This app detects specific objects (e.g. a person from an image with a
      person in it) and display the detected objects along with their respective
      confidence scores. However, it's important to note that the detection
      system is not perfect and may not achieve 100% accuracy.
    </p>
    <DetectForm @detect="handleDetect" @reset="handleReset" />
    <LoadingBar v-if="loading" />
    <div v-show="result" class="flex flex-col lg:flex-row items-center">
      <img
        class="w-full lg:w-2/3 mb-8 lg:mb-0"
        :src="src"
        alt=""
        ref="resultImage"
      />
      <div class="w-full lg:w-1/3 mx-auto grid place-items-center">
        <div>
          <h2 class="mb-2 lg:mb-4 text-lg sm:text-xl">
            Numbers of detected objects: {{ numberOfDetectedObjects }}
          </h2>
          <ul class="text-sm">
            <li v-for="(object, index) in detectedObjects" :key="index">
              Label: {{ object.label }}, Confience score:
              {{ Math.round(100 * object.confidence) }}%
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DetectForm from "./components/DetectForm.vue";
import LoadingBar from "./components/LoadingBar.vue";

const loading = ref(false);
const result = ref(false);
const src = ref(null);
const resultImage = ref(null);
const numberOfDetectedObjects = ref(null);
const detectedObjects = ref([]);

const handleDetect = async (payload) => {
  result.value = false;
  loading.value = true;
  const inputImage = payload.inputImage.value;
  const model = payload.model.value;
  src.value = URL.createObjectURL(inputImage.files[0]);

  // create an object detector using the model cocossd or yolo
  const objectDetector = await ml5.objectDetector(model);
  // detect objects from image using object detector,
  await objectDetector.detect(resultImage.value).then((objects) => {
    numberOfDetectedObjects.value = objects.length;
    detectedObjects.value = objects;
    console.log(detectedObjects);
    result.value = true;
    loading.value = false;
  });
};

const handleReset = () => {
  result.value = false;
};
</script>
