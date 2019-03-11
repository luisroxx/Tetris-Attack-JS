/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const STYLESHEET_CROP = {
    HORIZONTAL: "HORIZONTAL",
    VERTICAL: "VERTICAL"
};

const TRANSPARENT_COLOR = {
    WHITE: {
        r: 255,
        g: 255,
        b: 255
    },
    BLUE: {
        r: 0,
        g: 64,
        b: 128
    }
}

function loadSprite(json) {
    //spritesheet, startX, startY, width, heigth, scale, animationStyle, frames/
    let img = new Image();
    img.src = json.spritesheet;
    img.onload = function () {
        let body = document.getElementById("game");
        body.appendChild(this);
        let canvas = document.createElement('canvas');
        canvas.width = json.width;
        canvas.height = json.heigth;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, json.startX, json.startY, json.width, json.heigth, 0, 0, json.width, json.heigth);
        let animFrames = createFrames(canvas, json.width, json.heigth, json.scale, json.transparentColor, json.styleSheetCrop, json.frames);
        json.success(animFrames);
    };
}

function loadAnimation(animation) {
    //spritesheet, startX, startY, width, heigth, scale, animationStyle, frames/
    let json = animation.local;
    let img = new Image();
    img.src = json.spritesheet;
    img.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = json.width;
        canvas.height = json.heigth;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, json.startX, json.startY, json.width, json.heigth, 0, 0, json.width, json.heigth);
        animation.frames = createFrames(canvas, json.width, json.heigth, json.scale, json.transparentColor, json.styleSheetCrop, json.frames);
        json.success(animation);
    };
}

function createFrames(canvas, width, heigth, scale, transparentColor, styleSheetCrop, frames) {
    if (styleSheetCrop === STYLESHEET_CROP.HORIZONTAL) {
        return cropHorizontalFrames(canvas, width, heigth, scale, transparentColor, frames);
    } else if (styleSheetCrop === STYLESHEET_CROP.VERTICAL) {
        return cropVerticalFrames(canvas, width, heigth, scale, transparentColor, frames);
    } else {
        throw "Estilo de animação invalido";
    }
};

function cropHorizontalFrames(canvas, width, height, scale, transparentColor, frames) {
    let animFrames = [];
    let startX = 0;
    let startY = 0;
    width = width / frames;
    for (let i = 0; i < frames; i++) {
        let tempCanvas = document.createElement('canvas');
        let ctx = tempCanvas.getContext("2d");
        tempCanvas.width = width;
        tempCanvas.height = height;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);
        let trimmedCtx = trimFrame(ctx, transparentColor ,width, height);
        removeFrameAlphaChannel(trimmedCtx, transparentColor);
        let scalledCtx = scaleFrame(trimmedCtx, scale);
        animFrames.push(scalledCtx.canvas.toDataURL("image/png",1));
        startX += width;
    }
    return animFrames;
};

function cropVerticalFrames(canvas, width, height, transparentColor, frames) {
    let animFrames = [];
    let startX = 0;
    let startY = 0;
    height = height / frames;
    for (let i = 0; i < frames; i++) {
        let tempCanvas = document.createElement('canvas');
        let ctx = tempCanvas.getContext("2d");
        tempCanvas.width = width;
        tempCanvas.height = height;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);
        let trimmedCtx = trimFrame(ctx, transparentColor ,width, height);
        removeFrameAlphaChannel(trimmedCtx, transparentColor);
        let scalledCtx = scaleFrame(trimmedCtx, scale);
        animFrames.push(scalledCtx.canvas.toDataURL("image/png",1));
        startY += height;
    }
    return animFrames;
};

function trimFrame(ctx, transparentColor, width, height) {
    let ImageData = ctx.getImageData(0, 0, width, height);
    let leftMostPixel = 99999;
    let rightMostPixel = -1;
    let topMostPixel = 99999;
    let downMostPixel = -1;
    for (let y = 0; y < ImageData.height; y++) {
        for (let x = 0; x < ImageData.width; x++) {
            let pos = y * ImageData.width + x;
            let r = ImageData.data[pos * 4];
            let g = ImageData.data[pos * 4 + 1];
            let b = ImageData.data[pos * 4 + 2];
            if (r != transparentColor.r || g != transparentColor.g || b != transparentColor.b) {
                if (x < leftMostPixel) {
                    leftMostPixel = x;
                } else if (x > rightMostPixel) {
                    rightMostPixel = x;
                }

                if (y < topMostPixel) {
                    topMostPixel = y;
                } else if (y > downMostPixel) {
                    downMostPixel = y;
                }
            }
        }
    }
    let tempCanvas = document.createElement('canvas');
    let newWidth = rightMostPixel-leftMostPixel+1;
    let newHeight = downMostPixel-topMostPixel+1;
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;
    let tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(ctx.canvas, leftMostPixel, topMostPixel,newWidth,newHeight, 0,0,newWidth, newHeight);
    return tempCtx;
}

function removeFrameAlphaChannel(ctx, transparentColor) {
    let ImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (i = 0; i < ImageData.data.length; i += 4) {
        if (ImageData.data[i] == transparentColor.r &&
                ImageData.data[i + 1] == transparentColor.g &&
                ImageData.data[i + 2] == transparentColor.b) {
            //changePixelColor(ImageData, i)
            ImageData.data[i + 3] = 0;
        }
    }
    ctx.putImageData(ImageData, 0, 0);//put image data back
}

function scaleFrame(ctx, scale){
  let tempCanvas = document.createElement('canvas');
  let tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width=ctx.canvas.width;
  tempCanvas.height=ctx.canvas.height;
  tempCtx.drawImage(ctx.canvas,0,0);
  ctx.canvas.width*=scale;
  ctx.canvas.height*=scale;
  ctx = ctx.canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tempCanvas,0,0,tempCanvas.width,tempCanvas.height,0,0,ctx.canvas.width,ctx.canvas.height);
  return ctx;
}

function changePixelColor(ImageData, pixel) {
    ImageData.data[pixel] = 255;
    ImageData.data[pixel + 1] = 0;
    ImageData.data[pixel + 2] = 0;
}

function testLoad() {
    loadSprite({
        spritesheet: 'resources/images/characters/SNES - Tetris Attack - Yoshi.png',
        startX: 0,
        startY: 25,
        width: 240,
        heigth: 100,
        scale: 1,
        transparentColor: TRANSPARENT_COLOR.WHITE,
        styleSheetCrop: STYLESHEET_CROP.HORIZONTAL,
        frames: 3,
        success: testCreateAnimation});
    
    loadSprite({
        spritesheet: 'resources/images/characters/SNES - Tetris Attack - VS Mode Characters.png',
        startX: 141,
        startY: 5,
        width: 62,
        heigth: 41,
        scale: 2,
        transparentColor: TRANSPARENT_COLOR.BLUE,
        styleSheetCrop: STYLESHEET_CROP.HORIZONTAL,
        frames: 3,
        success: testCreateAnimation2});
};