const form = document.querySelector(".form");
const resultImage = document.querySelector(".resultImage");
const numberOfDetection = document.querySelector(".numberOfDetection");
const resultList = document.querySelector(".resultObjectList");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	numberOfDetection.innerText = "";
	resultList.innerText = "";
	const image = document.querySelector("#fileUpload");
	resultImage.src = URL.createObjectURL(image.files[0]);
	resultImage.style.width = "400px";
	resultImage.style.height = "400px";
	resultImage.style.objectFit = "cover";
	// create an object detector using cocossd model
	const objectDetector = ml5.objectDetector("cocossd");
	// detect objects from image using object detector
	objectDetector.detect(resultImage).then((objects) => {
		objects.forEach((object) => {
			console.log(object.label);
			console.log(object.confidence);
			resultList.insertAdjacentHTML(
				"beforeend",
				`<li>${object.label} | confidence score: ${Math.round(
					object.confidence * 100,
					2
				)} %</li>`
			);
		});
		numberOfDetection.innerText = `Number of detected object(s): ${objects.length}`;
	});
	image.value = "";
});
