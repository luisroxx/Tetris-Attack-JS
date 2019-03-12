/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let BG_YOSHI = {
    animations: [{
            name: "BG_YOSHI",
            local: {
                spritesheet: 'resources/images/bg/SNES - Tetris Attack - Stage Clear Backgrounds.png',
                startX: 0,
                startY: 0,
                width: 260,
                heigth: 225,
                scale: 1,
                transparentColor: TRANSPARENT_COLOR.WHITE,
                styleSheetCrop: STYLESHEET_CROP.HORIZONTAL,
                frames: 1
            },
            el: null,
            is_loaded: false,
            status: ANIMATION_STATUS.STOPPED,
            currFrame: 0,
            currAnimation: null,
            loop: true,
            frames: null,
            frameOrder: [0],
            frameTime: [1000]
        }
    ]
};

let GREEN_BLOCK = {
    animations: [{
            name: "IDLE",
            local: {
                spritesheet: 'resources/images/SNES - Tetris Attack - Block Set.png',
                startX: 3,
                startY: 3,
                width: 16,
                heigth: 16,
                scale: 1,
                transparentColor: TRANSPARENT_COLOR.WHITE,
                styleSheetCrop: STYLESHEET_CROP.HORIZONTAL,
                frames: 1
            },
            el: null,
            is_loaded: false,
            status: ANIMATION_STATUS.STOPPED,
            currFrame: 0,
            currAnimation: null,
            loop: true,
            frames: null,
            frameOrder: [0],
            frameTime: [1000]
        }
    ]
};

const scaledSize = 3;

function startSinglePlayer() {
    let anims = [];
    anims = anims.concat(BG_YOSHI.animations);
    anims = anims.concat(GREEN_BLOCK.animations);
    preCacheAnimations(anims, createScreenSinglePlayer);
};

function createScreenSinglePlayer() {
    setBGCSS();
    //createNewLine(0);
    //createNewLine(-48);
}

let addLineOffsetY = 0;

function addLine(){
    createNewLine(addLineOffsetY);
    addLineOffsetY-=GREEN_BLOCK.animations[0].el.width;
}

function openFullscreen() {
    if (Game.requestFullscreen) {
        Game.requestFullscreen();
    } else if (Game.mozRequestFullScreen) { /* Firefox */
        Game.mozRequestFullScreen();
    } else if (Game.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        Game.webkitRequestFullscreen();
    } else if (Game.msRequestFullscreen) { /* IE/Edge */
        Game.msRequestFullscreen();
    }
}
;

function setBGCSS(){
    rescaleGameWindow(BG_YOSHI.animations[0].el,scaledSize);
    Game.style.margin = "0 auto";
    Game.style.position = "relative";
    Game.style.textAlign = "center"; 
    Game.style.background = "url("+BG_YOSHI.animations[0].el.src+")" ;
    Game.style.backgroundrepeat =  "no-repeat";
    Game.style.backgroundSize =  "cover";
}

function createNewLine(offsetY){
    let offsetX = 0;
    for (let i=0; i<6;i++){
        offsetX += createPiece(offsetX,offsetY);
    }
}

function createPiece(offsetX,offsetY){
    let piece = copy2(GREEN_BLOCK);
    console.log("piece" + piece);
    rescaleObj(piece.animations[0].el,scaledSize);
    Game.appendChild(piece.animations[0].el);
    posPiece(piece.animations[0].el, offsetX,offsetY);
    return piece.animations[0].el.width;
}

function rescaleGameWindow(bgImg, scale){
    Game.style.height = bgImg.height*scale+"px";
    Game.style.width = bgImg.width*scale+"px";
}

function rescaleObj(piece, scale){
    piece.style.height = piece.height*scale+"px";
    piece.style.width = piece.width*scale+"px";
}

function posPiece(piece, offsetX,offsetY){
    piece.style.position = "absolute";
    let gameWidth = (Game.offsetWidth);
    let gameHeight = (Game.offsetHeight);
    console.log(gameHeight + "posHeigth");
    console.log(piece.width);
    console.log(offsetX);
    //piece.style.left = (piece.width*2.5)+(-gameWidth/2)+(piece.width/2)+gameWidth*0.345+"px";
    piece.style.left = offsetX+gameWidth*0.345+"px";
    piece.style.top = offsetY-(piece.height)+gameHeight*0.959641+"px";
    //piece.style.top = "0px";
    
    console.log(piece.style.top + "piece top");
}
    
function copy(o) {
   console.log (JSON.stringify(o));
   let obj = JSON.parse(JSON.stringify(o));
   createAnimation(obj.animations[0], createPiece);
}

function copy2(o) {
    let obj = jQuery.extend({}, o);
    obj.animations[0].el = o.animations[0].el.cloneNode(true);
    return obj;
}

