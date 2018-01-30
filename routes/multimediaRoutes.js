const passport = require("passport");
const Jimp = require("jimp");
const intensityHisto = require("../public/histograms/intensityHistogram");
const colorCodeHisto = require("../public/histograms/colorCodeHistogram");
const normalized = require("../public/histograms/normalized");
const mathjs = require("mathjs");

module.exports = (app) => {

    app.get("/api/histogram", function(req, res) {
        //console.log(req.query);

        if(req.query.method === "intensity") {
            // intensitySort(function(cb) {
            //     res.send(cb);
            // })
            res.send(intensityHisto);
        }
        else if(req.query.method === "colorcoded") {
            // colorCodeSort(function(cb) {
            //     res.send(cb);
            // })
            res.send(colorCodeHisto);
        }
        else {
            // combineHistograms(intensityHisto, colorCodeHisto, function(result) {
            //     normalizeHistogram(result, function(h) {
            //         res.send(h);
            //     });
            // });
            res.send(normalized);
        }
    });

    app.post("/api/findDistances", function(req, res) {
        //console.log("here", req.body);
        const results = [];
        let buckets = req.body.buckets;
        let image = req.body.image;
        console.log("hest", buckets.length, image);

        for(let i = 1; i <= 100; i++) {
            findDistances(buckets, image, i, function(distance) {
                const temp = {};
                temp.index = i;
                temp.distance = distance;
                results.push(JSON.parse(JSON.stringify(temp)));
            })
        }
        results.sort(function(a, b) {
            return a.distance - b.distance;
        });
        res.send(results);
    });
}

function combineHistograms(a, b, cb) {
    let combined = [];
    for(let i = 0; i < 100; i++) {
        //console.log(i, a[i].length, b[i].length);

        let temp = a[i].concat(b[i]);
        //console.log(temp);
        combined.push(JSON.parse(JSON.stringify(temp)));

        if(i === 99) {
            //console.log("complete");
            cb(JSON.parse(JSON.stringify(combined)));
        }
        //cb(JSON.parse(JSON.stringify(combined)));
    }
}

function normalizeHistogram(histogram, cb) {
    const avgOfColumn = [];
    const stdOfColumn = [];

    // divide counts by pixel size, to get weights
    for(let row = 0; row < histogram.length; row++) {
        for(let col = 0; col < histogram[row].length; col++) {
            histogram[row][col] = histogram[row][col] / 98034;
        }
    }

    for(let i = 0; i < 89; i++) {
        let nums = [];
        for(let j = 0; j < 100; j++) {
            nums.push(histogram[j][i]);
        }
        let avg = mathjs.mean(nums);
        let std = mathjs.std(nums);
        avgOfColumn.push(avg);
        stdOfColumn.push(std);
        //console.log("here", avgOfColumn, stdOfColumn);
    }

    for(let row = 0; row < histogram.length; row++) {

        for(let col = 0; col < histogram[row].length; col++) {
            let temp = (histogram[row][col] - avgOfColumn[col]) / stdOfColumn[col];
            if(!temp) {
                histogram[row][col] = 0;
            }
            else {
                histogram[row][col] = (histogram[row][col] - avgOfColumn[col]) / stdOfColumn[col];
            }

            //console.log(avgOfColumn[col], stdOfColumn[col],  row, col, temp, histogram[row][col]);
            //console.log("here2", avgOfColumn, stdOfColumn);
            console.log(row, col, avgOfColumn[col], stdOfColumn[col], temp);
        }
    }

    cb(JSON.parse(JSON.stringify(histogram)));
}

function get2Bits(int) {
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
    return Math.round((.299 *  r) + (.578 * g) + (.114 * b));
}

function intensitySort(cb) {
    const finalBuckets = [];
    for(let x = 0; x < 100; x++) {
        const intensities = createEmptyArray(25);
    	//Jimp.read("/static/images/" + (x + 1) + ".jpg", function(err, image) {
        Jimp.read("./public/images/" + (x + 1) + ".jpg", function(err, image) {
            if(err) cb(err);
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
            let img = {
                index: x + 1,
                intensities: JSON.parse(JSON.stringify(intensities))
            }
            finalBuckets.push(img);
            if(finalBuckets.length === 100) {
                finalBuckets.sort(function(a, b) {
                    return a.index - b.index;
                })
                let result = [];
                finalBuckets.map(function(k) {
                    result.push(k.intensities);
                })
                cb(result);
            }
        });
    }
}

function colorCodeSort(cb) {
    const finalBuckets = [];
    for(let x = 0; x < 100; x++) {
        const buckets = createEmptyArray(64);

        Jimp.read("./public/images/" + (x + 1) + ".jpg", function(err, image) {
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
            let img = {
                index: x + 1,
                bucketss: JSON.parse(JSON.stringify(buckets))
            }
            finalBuckets.push(img);
            if(finalBuckets.length === 100) {
                finalBuckets.sort(function(a, b) {
                    return a.index - b.index;
                })
                let result = [];
                finalBuckets.map(function(k) {
                    result.push(k.bucketss);
                })
                cb(result);
            }
        });
    }
}

function findDistances(buckets, img1, img2, cb) {
    //console.log("length", buckets.length);
    let distance = 0;
    let a = img1 - 1;
    let b = img2 - 1;

    for(let bucket = 0; bucket < buckets[0].length; bucket++) {
        let aVal = buckets[img1 - 1][bucket] / 98034;
        let bVal = buckets[img2 - 1][bucket] / 98034;
        distance += Math.abs(aVal - bVal);

        if(bucket === buckets[0].length - 1) {
            cb(distance);
        }
    }
}
