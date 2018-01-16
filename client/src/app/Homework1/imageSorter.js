var getPixels = require("get-pixels");
const ImageParser = require("image-parser");

export function testGetPixels() {
    var img = new Image();
    img.src = process.env.PUBLIC_URL + '/images/' + 1 + '.jpg';
    console.log(img.width, img.height);

}

export function intensitySort(index) {
	return index;
}

export function colorCodeSort(index) {
	return index;
}

export function findDistance(a, b) {
	return "dist";
}
