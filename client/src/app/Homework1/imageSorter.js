require('jimp/browser/lib/jimp');
const Jimp = window.Jimp;

export  function get2Bits(int) {
    let a = (int >> 7) & 1;
    let b = (int >> 6) & 1;
    return "" + a.toString() + b.toString();
}

function createEmptyArray(length) {
    const intensities = [];
    for(let i = 0; i < length; i++) {
        intensities.push(0);
    }
    return JSON.parse(JSON.stringify(intensities));
}

function calculateIntensity(r, g, b) {
    return (.299 *  r) + (.578 * g) + (.114 * b);
}

export function intensitySort(cb) {
    const finalBuckets = [];
    for(let x = 0; x < 100; x++) {
        const intensities = createEmptyArray(25);

    	Jimp.read(process.env.PUBLIC_URL + "/images/" + (x + 1) + ".jpg", function(err, image) {
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
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
            });
            //intensities.push(image.bitmap.width * image.bitmap.height);
            finalBuckets.push(JSON.parse(JSON.stringify(intensities)));

            if(finalBuckets.length === 100) {
                cb(finalBuckets);
            }
        });
    }
}

export function colorCodeSort(cb) {
    const finalBuckets = [];
    for(let x = 0; x < 100; x++) {
        const buckets = createEmptyArray(64);

        Jimp.read(process.env.PUBLIC_URL + "/images/" + (x + 1) + ".jpg", function(err, image) {
            image.scan(0, 0, image.bitmap.width, image.bitmap.height,  function (x, y, idx) { // 0, 0, image.bitmap.width, image.bitmap.height,
                let red   = this.bitmap.data[ idx + 0 ];
                let green = this.bitmap.data[ idx + 1 ];
                let blue  = this.bitmap.data[ idx + 2 ];
                let redBits = get2Bits(red);
                let greenBits = get2Bits(green);
                let blueBits = get2Bits(blue);
                let str = redBits + greenBits + blueBits;
                let bucket = parseInt(str, 2);
                buckets[bucket]++;
            });
            //buckets.push(image.bitmap.width * image.bitmap.height);
            finalBuckets.push(JSON.parse(JSON.stringify(buckets)));

            if(finalBuckets.length === 100) {
                cb(finalBuckets);
            }
        });
    }
}

export function findDistances(buckets, img1, img2, cb) {
    let distance = 0;
    let a = img1 - 1;
    let b = img2 - 1;

    for(let bucket = 0; bucket < buckets[0].length; bucket++) {
        let aVal = buckets[a][bucket] / 98034;
        let bVal = buckets[b][bucket] / 98034;
        //console.log("before", aVal, bVal, distance);
        let d = Math.abs(aVal - bVal);
        distance = distance + d;
        //console.log("After", distance, d);
    }
    cb(distance);
}
