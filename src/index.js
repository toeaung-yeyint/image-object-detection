// select form element
const form = document.querySelector(".form");
//  select reset button
const resetButton = document.querySelector(".reset-button");
// select result section element
const result = document.querySelector(".image-container");
// event listener to handle the event when a user clicks on detect button
form.addEventListener("submit", (e) => {
	e.preventDefault();
	// remove any child element under result section element
	result.innerText = "";
	// select the image
	const image = document.querySelector("#image-upload");
	// create img element
	const resultImage = document.createElement("img");
	// create an object detector using cocossd model
	const objectDetector = ml5.objectDetector("cocossd");
	// hide the image until all the objects are detected
	resultImage.style.visibility = "hidden";
	// show loading sign when the object are getting detected
	const example = document.createElement("p");
	example.innerText = "Loading ...";
	example.classList.add("loading");
	result.append(example);
	// detect objects from image using object detector,
	// once the image has all its detected objects, remove loading element
	// draw squre boxes around the detected objects on desktop devices
	// show detected objects as a list on mobile devices
	objectDetector.detect(resultImage).then((objects) => {
		const detectedObjects = document.createElement("p");
		detectedObjects.classList.add("detected-objects");
		detectedObjects.innerText = `Detected objects: ${objects.length}`;
		const objectList = document.createElement("ul");
		result.append(detectedObjects);
		result.append(objectList);
		objects.forEach((object) => {
			objectList.insertAdjacentHTML(
				"beforeend",
				`<li>label: ${object.label} | confidence score: ${Math.round(
					object.confidence * 100
				)}%</li>`
			);
			const span = document.createElement("span");
			span.classList.add("squre-box");
			span.innerText = `${object.label}|${Math.round(
				object.confidence * 100
			)}%`;
			span.style.width = `${object.width}px`;
			span.style.height = `${object.height}px`;
			span.style.left = `${object.x}px`;
			span.style.top = `${object.y}px`;
			result.append(span);
		});
		document.querySelector(".loading").remove();
		resultImage.style.visibility = "visible";
	});
	// insert result image under result element
	result.append(resultImage);
	// convert image object into string for src attribute
	resultImage.src = URL.createObjectURL(image.files[0]);
	resultImage.classList.add("result-image");
	// remove the value from the image input field
	image.value = "";
});

// event listener to handle the event when a user clicks on reset button
resetButton.addEventListener("click", () => {
	// select image input field
	const image = document.querySelector("#image-upload");
	// remove the value from the input field
	image.value = "";
	// remove everything inside image-container element
	result.innerText = "";
});
