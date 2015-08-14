

class ImageUtils {

    static getCanvas(w, h) {
        var c = document.querySelector("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    static getPixels(img) {
        var c = ImageUtils.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0,0,c.width,c.height);
    }

    static putPixels(imageData, w, h) {
        var c = ImageUtils.getCanvas(w, h);
        var ctx = c.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }

}

class RGBA {
    constructor(redValue, greenValue, blueValue, alphaValue) {
        this.red = redValue;
        this.green = greenValue;
        this.blue = blueValue;
        this.alpha = alphaValue;
    }
}
var colour = new RGBA(255, 100, 50, 255);
console.log(colour.red);
console.log(colour.alpha);




function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function definitions here

$(document).ready(function() {
    var img = new Image();
    img.src = "img/omocat.png";


    sepia(img);
    //makeFunky(img);
    //makeInvert(img);
    //removeWhite(img);
});



function removeWhite(){

    remove.background;

}




function sepiaPixel(colour) {

    var modifiedRed = colour.red * 0.413 + colour.green * 2.2378 + colour.blue * 1.94385
    var modifiedGreen = colour.red * -1.5 + colour.green * -0.09 + colour.blue * 2.1223
    var modifiedBlue = colour.red * 1.456234 + colour.green * 2.723 + colour.blue * -0.123

    return new RGBA(modifiedRed, modifiedGreen, modifiedBlue, colour.alpha);
}

function sepia(img) {

    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all;i += 4) {
        var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);

        if(originalRGBA.red >100 && originalRGBA.green >100 && originalRGBA.blue >100){
            originalRGBA.alpha = 0;
        }

        data[i+3] = originalRGBA.alpha;
    }

    ImageUtils.putPixels(pixels, img.width, img.height);
}

function makeFunky(img) {
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length/2; i +=2) {
        var temp = data[i];
        data[i] = data[length - i];
        data[length - i] = temp;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}
function makeInvert(img) {
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length;i += 4) {
        data[i] = 255 - data[i];
        data[i+1] = 255 - data[i+1];
        data[i+2] = 255 - data[i+2];
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}