require('jimp/browser/lib/jimp');
const Jimp = window.Jimp;

export function testGetPixels() {
    var finalBuckets = [];

    // for every imaage
    for(var x = 0; x < 100; x++) {
        var file = process.env.PUBLIC_URL + "/images/" + (x + 1) + ".jpg";
        console.log("file", file);

        // create empty array
        var intensities = [];
        for(var i = 0; i < 25; i++) {
            intensities.push(0);
        }

    	Jimp.read(file, function(err, image) {
    		if (err) throw err;

            // for every pixel in the image
            for(var row = 0; row < image.bitmap.width; row++) {
                for(var col = 0; col < image.bitmap.height; col++) {

                    // get bucket that pixel goes in
                    var rgb = Jimp.intToRGBA(image.getPixelColor(row, col));
                    var intensity = calculateIntensity(rgb.r, rgb.g, rgb.b);
                    var bucket = Math.floor(intensity / 10);

                    if(bucket > 23) {
                        intensities[24]++;
                    }
                    else {
                        intensities[bucket]++;
                    }
                }
            }
            finalBuckets.push(intensities.slice());
            // //intensities = [];
            // var c = 0;
            // intensities.forEach(function(y) {
            //     c += y;
            // });
            // console.log("found", c);

            console.log((finalBuckets));
        });
    }
    console.log(finalBuckets);
}

function calculateIntensity(r, g, b) {
    return (.299 *  r) + (.578 * g) + (.114 * b);
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
