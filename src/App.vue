<template>
  <div class="max-w-screen-lg mx-auto mb-16 px-4">
    <NavigationBar />
    <IntroSection />
    <DetectForm @detect="handleDetect" @reset="handleReset" />
    <LoadingBar v-if="loading" />
    <div v-show="result" class="flex flex-col lg:flex-row">
      <div class="relative mb-8 lg:mb-0 w-full lg:w-2/3">
        <img class="w-full" :src="src" alt="" ref="resultImage" />
        <span
          class="text-[#00ff00] inline-block cursor-default text-xs sm:text-base lg:font-medium border-2 border-[#00ff00] absolute lg:bg-black lg:bg-opacity-20 lg:hover:bg-opacity-30"
          v-for="(object, index) in detectedObjects"
          :key="index"
          :style="{
            top: `${object.y * scalingFactor}px`,
            left: `${object.x * scalingFactor}px`,
            width: `${object.width * scalingFactor}px`,
            height: `${object.height * scalingFactor}px`,
          }"
        >
          {{ index + 1 }}
        </span>
      </div>
      <div class="w-full lg:w-1/3 mx-auto grid place-items-center">
        <div>
          <h2 class="mb-2 lg:mb-4 text-lg sm:text-xl">
            Numbers of detected objects: {{ numberOfDetectedObjects }}
          </h2>
          <ul class="text-sm list-decimal pl-4">
            <li v-for="(object, index) in detectedObjects" :key="index">
              {{ object.label }} | confience score:
              {{ Math.round(100 * object.confidence) }}%
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NavigationBar from "./components/NavigationBar.vue";
import IntroSection from "./components/IntroSection.vue";
import DetectForm from "./components/DetectForm.vue";
import LoadingBar from "./components/LoadingBar.vue";

const loading = ref(false);
const result = ref(false);
const numberOfDetectedObjects = ref(null);
const detectedObjects = ref([]);
const src = ref(null);
const resultImage = ref(null);
const scalingFactor = ref(null);

onMounted(() => {
  window.addEventListener("resize", () => {
    if (result.value) {
      scalingFactor.value =
        resultImage.value.offsetWidth / resultImage.value.naturalWidth;
    }
  });
});

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

    result.value = true;
    loading.value = false;
  });
  scalingFactor.value =
    resultImage.value.offsetWidth / resultImage.value.naturalWidth;
};

const handleReset = () => {
  result.value = false;
};
</script>
