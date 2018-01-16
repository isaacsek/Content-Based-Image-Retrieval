require('jimp/browser/lib/jimp');
const Jimp = window.Jimp;

export  function get2Bits(int) {
    let a = (int >> 7) & 1;
    let b = (int >> 6) & 1;
    let c = "" + a.toString() + b.toString();
    //console.log(c);
    return "" + a.toString() + b.toString();
}

export function testGetPixels3() {
    const finalBuckets = [];

    // for every imaage
    for(let x = 0; x < 1; x++) {
        const file = process.env.PUBLIC_URL + "/images/" + (x + 1) + ".jpg";
        // create empty array
        const buckets = [];

        for(let i = 0; i < 64; i++) {
            buckets.push(0);
        }

    	Jimp.read(file, function(err, image) {
            image.scan(0, 0, image.bitmap.width, image.bitmap.height,  function (x, y, idx) {
                // x, y is the position of this pixel on the image
                // idx is the position start position of this rgba tuple in the bitmap Buffer
                // this is the image

                let red   = this.bitmap.data[ idx + 0 ];
                let green = this.bitmap.data[ idx + 1 ];
                let blue  = this.bitmap.data[ idx + 2 ];

                let redBits = get2Bits(red);
                let greenBits = get2Bits(green);
                let blueBits = get2Bits(blueBits);
                let str = redBits + greenBits + blueBits;

                let bucket = parseInt(str, 2);
                //console.log(redBits, greenBits,  blueBits, str, bucket);

                buckets[bucket]++;
            });
            let count = 0;
            buckets.forEach(function(x) {
                    count += x;
            })
            console.log("count", count);
            finalBuckets.push(buckets);
            console.log((finalBuckets));
        });
    }
}

export function testGetPixels1() {
    const finalBuckets = [];

    // for every imaage
    for(let x = 0; x < 100; x++) {
        const file = process.env.PUBLIC_URL + "/images/" + (x + 1) + ".jpg";
        // create empty array
        const intensities = [];
        for(let i = 0; i < 25; i++) {
            intensities.push(0);
        }

    	Jimp.read(file, function(err, image) {
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
                // x, y is the position of this pixel on the image
                // idx is the position start position of this rgba tuple in the bitmap Buffer
                // this is the image

                let red   = this.bitmap.data[ idx + 0 ];
                let green = this.bitmap.data[ idx + 1 ];
                let blue  = this.bitmap.data[ idx + 2 ];
                let intensity = calculateIntensity(red, green, blue);
                let bucket = Math.floor(intensity / 10);

                if(bucket >= 24) {
                    intensities[24]++;
                }
                else {
                    intensities[bucket]++;
                }
                // rgba values run from 0 - 255
                // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
            });


            finalBuckets.push(intensities);
            //finalBuckets.push(JSON.parse(JSON.stringify(intensities)));
            console.log((finalBuckets));
        });
    }
}

export function testGetPixels2() {
    const finalBuckets = [];

    // for every imaage
    for(let x = 0; x < 100; x++) {
        const file = process.env.PUBLIC_URL + "/images/" + (x + 1) + ".jpg";
        // create empty array
        const intensities = [];
        for(let i = 0; i < 25; i++) {
            intensities.push(0);
        }

    	Jimp.read(file, function(err, image) {
    		if (err) throw err;

            // for every pixel in the image
            for(let row = 0; row < image.bitmap.width; row++) {
                for(let col = 0; col < image.bitmap.height; col++) {

                    // get bucket that pixel goes in
                    const rgb = Jimp.intToRGBA(image.getPixelColor(row, col));
                    const intensity = calculateIntensity(rgb.r, rgb.g, rgb.b);
                    const bucket = Math.floor(intensity / 10);

                    if(bucket > 23) {
                        intensities[24]++;
                    }
                    else {
                        intensities[bucket]++;
                    }
                }
            }
            finalBuckets.push(intensities);
            //finalBuckets.push(JSON.parse(JSON.stringify(intensities)));
            console.log((finalBuckets));
        });
    }
}

function createEmptyArray() {
    const intensities = [];
    for(let i = 0; i < 25; i++) {
        intensities.push(0);
    }
    return intensities.splice();
}

function calculateIntensity(r, g, b) {
    return (.299 *  r) + (.578 * g) + (.114 * b);
}

export function sortIntoIntensityBuckets(intensities, image) {
    for(let row = 0; row < image.bitmap.width; row++) {
        for(let col = 0; col < image.bitmap.height; col++) {

            // get bucket that pixel goes in
            const rgb = Jimp.intToRGBA(image.getPixelColor(row, col));
            const intensity = calculateIntensity(rgb.r, rgb.g, rgb.b);
            const bucket = Math.floor(intensity / 10);

            if(bucket > 23) {
                intensities[24]++;
            }
            else {
                intensities[bucket]++;
            }
        }
    }
    return intensities.slice();
}

export async function intensitySort(index) {
    const finalBuckets = [];

    // for every imaage
    for(var x = 0; x < 100; x++) {
        Jimp.read(process.env.PUBLIC_URL + "/images/" + (x + 1) + ".jpg").then(function(image) {
            const intensityBucket = createEmptyArray();
            sortIntoIntensityBuckets(intensityBucket, image);
            finalBuckets.push(intensityBucket);
            console.log(finalBuckets);
        });
    }
}

export function colorCodeSort(index) {
	return index;
}

export function findDistance(a, b) {
	return "dist";
}
