/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const STYLESHEET_CROP = {
    HORIZONTAL: "HORIZONTAL",
    VERTICAL: "VERTICAL"
};

const ANIMATION_STYLE = {
    HORIZONTAL: "HORIZONTAL",
    VERTICAL: "VERTICAL"
};

let canvas = document.createElement('canvas');

function load() {
    let frames = spriteLoader({
        sprite: 'resources/images/characters/SNES - Tetris Attack - Yoshi.png',
        startX: 0,
        startY: 25,
        width: 240,
        heigth: 100,
        styleSheetCrop: STYLESHEET_CROP.HORIZONTAL,
        frames: 3,
        success: createanimation});
}
;

function createanimation(animFrames) {
    let body = document.getElementById("game");
    for (let i = 0; i < animFrames.length; i++) {
        let img = new Image();
        img.src = animFrames[i];
        img.style.border = "1px solid black";
        img.onload = function () {
            body.appendChild(this);
        }
    }

    let anim = new Image();
    body.appendChild(anim);
    let animatedObject = {
        el: anim,
        status: "go",
        currFrame: 0,
        frames: animFrames,
        frameOrder: [0, 2, 1, 2],
        frameTime: [100, 100, 100, 100]
    };
    animatedObject.currFrame = 0;
    anim.src = animatedObject.frames[animatedObject.currFrame];
    anim.onload = function () {
        anim.onload = null;
        //setTimeout(function() { animate(animatedObject); }, 1000);
        setTimeout(animate, animatedObject.frameTime[animatedObject.currFrame], animatedObject);
    }
}

function spriteLoader(json) {
    //sprite, startX, startY, width, heigth, animationStyle, frames
    let img = new Image();
    img.src = json.sprite;
    img.onload = function () {
        let body = document.getElementById("game");
        body.appendChild(this);
        canvas.width = json.width;
        canvas.height = json.heigth;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, json.startX, json.startY, json.width, json.heigth, 0, 0, json.width, json.heigth);
        let animFrames = createFrames(ctx, json.width, json.heigth, json.styleSheetCrop, json.frames);
        //trimFrame(animFrames, json.width, json.heigth);
//        removeAlpha(ctx, json.width, json.heigth);
        json.success(animFrames);
    };
}

function removeAlphaFrame(ctx, width, heigth) {
    let ImageData = ctx.getImageData(0, 0, width, heigth);

    for (i = 0; i < ImageData.data.length; i += 4) {
        if (ImageData.data[i] == 255 &&
                ImageData.data[i + 1] == 255 &&
                ImageData.data[i + 2] == 255) {
            //changePixelColor(ImageData, i)
            ImageData.data[i + 3] = 0;
        }
    }
    ctx.putImageData(ImageData, 0, 0);//put image data back
}

function changePixelColor(ImageData, pixel) {
    ImageData.data[pixel] = 0;
    ImageData.data[pixel + 1] = 0;
    ImageData.data[pixel + 2] = 0;
}

function trimFrame(ctx, width, heigth) {
    let leftMostPixel = 99999;
    let rightMostPixel = -1;
    let topMostPixel = 99999;
    let downMostPixel = -1;
    let ImageData = ctx.getImageData(0, 0, width, heigth);
    alert(ImageData.height);
    alert(ImageData.width);
    for (let y = 0; y < ImageData.height; y++) {
        for (let x = 0; x < ImageData.width; x++) {
            let pos = y * ImageData.width + x;
            let r = ImageData.data[pos * 4];
            let g = ImageData.data[pos * 4 + 1];
            let b = ImageData.data[pos * 4 + 2];
            //let a = ImageData.data[(y * 4) + (x * ImageData.heigth)];
            if (r != 255 && g != 255 && b != 255) {
                if (x < leftMostPixel) {
                    leftMostPixel = x;
                } else if (x > rightMostPixel) {
                    rightMostPixel = x;
                }

                if (y < topMostPixel) {
                    topMostPixel = x;
                } else if (y > downMostPixel) {
                    downMostPixel = x;
                }
            }
        }
    }
    console.log(leftMostPixel);
    console.log(rightMostPixel);
    console.log(topMostPixel);
    console.log(downMostPixel);
    ctx.putImageData(ImageData, leftMostPixel, topMostPixel, 0, 0, rightMostPixel, downMostPixel);
}

function createFrames(ctx, width, heigth, styleSheetCrop, frames) {
    if (styleSheetCrop === STYLESHEET_CROP.HORIZONTAL) {
        return createHorizontalFrames(ctx, width, heigth, frames);
    } else if (styleSheetCrop === STYLESHEET_CROP.VERTICAL) {
        return createVerticalFrames(ctx, width, heigth, frames);
    } else {
        throw "Estilo de animação invalido";
    }
}
;

function createHorizontalFrames(ctx, width, heigth, frames) {
    let animFrames = [];
    let tempCanvas = document.createElement('canvas');
    let tempCtx = tempCanvas.getContext("2d");
    let startX = 0;
    let startY = 0;
    width = width / frames;
    tempCanvas.width = width;
    tempCanvas.height = heigth;
    for (let i = 0; i < frames; i++) {
        tempCtx.drawImage(canvas, startX, startY, width, heigth, 0, 0, width, heigth);
        animFrames.push(tempCanvas.toDataURL());
        startX += width;
        tempCtx.clearRect(0, 0, width, heigth);
    }
    return animFrames;
}
;

function createVerticalFrames(width, heigth, frames) {
    let animFrames = [];
    let tempCanvas = document.createElement('canvas');
    let tempCtx = tempCanvas.getContext("2d");
    let startX = 0;
    let startY = 0;
    height = height / frames;
    tempCanvas.width = width;
    tempCanvas.height = heigth;
    for (let i = 0; i < frames; i++) {
        tempCtx.drawImage(canvas, startX, startY, width, heigth, 0, 0, width, heigth);
        animFrames.push(tempCanvas.toDataURL());
        startY += heigth;
        tempCtx.clearRect(0, 0, width, heigth);
    }
    return animFrames;
}
;

function animate(obj) {
    if (obj.currFrame === obj.frameOrder.length - 1)
        obj.currFrame = 0;
    else
        obj.currFrame++;
    obj.el.src = obj.frames[obj.frameOrder[obj.currFrame]];
    obj.el.onload = function () {
        obj.el.onload = null;
        //setTimeout(function() { animate(obj); }, 1000);
        setTimeout(animate, obj.frameTime[obj.currFrame], obj);
    }
}