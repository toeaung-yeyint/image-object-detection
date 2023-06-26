<template>
	<div class="max-w-screen-lg my-28 mx-auto">
		<h1 class="uppercase text-center mb-10 text-3xl font-bold">
			image-object-detection
		</h1>
		<p class="mb-4">
			<strong>Built using:</strong> Vue, Composition API, ml5.js, HTML,
			Tailwind, Vite
		</p>
		<p class="mb-20">
			This app detects specific objects (e.g. a person from an image with a
			person in it) and display the detected objects along with their respective
			confidence scores. However, it's important to note that the detection
			system is not perfect and may not achieve 100% accuracy.
		</p>
		<DetectForm />
	</div>
</template>

<script setup>
import { ref } from "vue";
import DetectForm from "./components/DetectForm.vue";
</script>
