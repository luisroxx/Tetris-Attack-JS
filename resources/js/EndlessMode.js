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

let CURSOR = {
    animations: [{
            name: "CURSOR",
            local: {
                spritesheet: 'resources/images/SNES - Tetris Attack - Miscellaneous.png',
                startX: 118,
                startY: 41,
                width: 36,
                heigth: 20,
                scale: 1,
                transparentColor: TRANSPARENT_COLOR.BLUE,
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

let addLineOffsetY;
let blocks;

function startEndlessMode() {
    blocks = new Array();
    addLineOffsetY = 0;
    let anims = [];
    anims = anims.concat(BG_YOSHI.animations);
    anims = anims.concat(GREEN_BLOCK.animations);
    anims = anims.concat(CURSOR.animations);
    preCacheAnimations(anims, createEndlessMode);
};

function createEndlessMode() {
    startBG();
    addLine();
    startCursor();
    //startTimerIntro().then(StartGameLogic());
    setInterval(moveObjects,1000);
}

window.onkeydown = function(e)
{
        code = e.keyCode;

	switch(code){
//		case 40://baixo
//                    
//			movimentar(jogo, cursor, 0, 1, tabuleiro.dimensoes)
//		break;
		case 39://direita,
                        if(x>blocks.length-3) return;
                        x++;
                        movimentarCursor(CURSOR.animations[0].el);
		break;
//		case 38://cima
//			movimentar(jogo, cursor, 0, -1, tabuleiro.dimensoes)
//		break;
		case 37://esquerda
                     if(x<1) return;
                        x--;
                        movimentarCursor(CURSOR.animations[0].el);
		break;
//		case 32://space
//			if(switchBlock(jogo, cursor))
//				checkCombinacoes(jogo);
//		break;
	}
}



function startBG(){
    rescaleGameWindow(BG_YOSHI.animations[0].el,scaledSize);
    vieweEndlessMode.style.position = "relative";
    vieweEndlessMode.style.background = "url("+BG_YOSHI.animations[0].el.src+")" ;
    vieweEndlessMode.style.backgroundrepeat = "no-repeat";
    vieweEndlessMode.style.backgroundSize =  "cover";
};

function startCursor(){
    rescaleObj(CURSOR.animations[0].el);
    vieweEndlessMode.appendChild(CURSOR.animations[0].el);
    posCursor(CURSOR.animations[0].el);
};

function posCursor(cursor){
    cursor.style.position = "absolute";
    cursor.style.zIndex = "5";
    let gameWidth = (Game.offsetWidth);
    let gameHeight = (Game.offsetHeight);
    //cursor.style.top = -(cursor.height)+gameHeight*0.959641+"px";
    //cursor.style.left = gameWidth*0.34+"px";
    cursor.style.left = getLeft(blocks[0].animations[0].el)-(cursor.width*0.05)+"px";
    cursor.style.top =  getTop(blocks[0].animations[0].el)-(cursor.height*0.1)+"px";
}
let x = 0;
function movimentarCursor(cursor){
    cursor.style.left = getLeft(blocks[x].animations[0].el)-(cursor.width*0.05)+"px";
    cursor.style.top =  getTop(blocks[x].animations[0].el)-(cursor.height*0.1)+"px";
}

function moveObjects(){
    CURSOR.animations[0].el.style.top = (getTop(CURSOR.animations[0].el)-scaledSize)+"px";
    for (let i = 0; i<blocks.length;i++){
        blocks[i].animations[0].el.style.top = (getTop(blocks[i].animations[0].el)-scaledSize)+"px";
    }
    //addLineOffsetY-=GREEN_BLOCK.animations[0].el.width;
}



function getTop(el){
    var top = el.style.top;
    return parseInt(top.replace("px",""));
}

function getLeft(el){
    var top = el.style.left;
    return parseInt(top.replace("px",""));
}

function addLine(){
    createNewLine(addLineOffsetY);
    //addLineOffsetY-=GREEN_BLOCK.animations[0].el.width;
}

function createNewLine(offsetY){
    let offsetX = 0;
    for (let i=0; i<6;i++){
        offsetX += createPiece(offsetX,offsetY);
    }
}

function createPiece(offsetX,offsetY){
    let piece = copy(GREEN_BLOCK);
    rescaleObj(piece.animations[0].el);
    vieweEndlessMode.appendChild(piece.animations[0].el);
    posPiece(piece.animations[0].el, offsetX,offsetY);
    blocks.push(piece);
    return piece.animations[0].el.width;
}

function rescaleGameWindow(bgImg){
    Game.style.height = bgImg.height*scaledSize+"px";
    Game.style.width = bgImg.width*scaledSize+"px";
}

function rescaleObj(obj){
    obj.style.height = obj.height*scaledSize+"px";
    obj.style.width = obj.width*scaledSize+"px";
}

function posPiece(piece, offsetX,offsetY){
    piece.style.position = "absolute";
    let gameWidth = (Game.offsetWidth);
    let gameHeight = (Game.offsetHeight);
    //piece.style.left = (piece.width*2.5)+(-gameWidth/2)+(piece.width/2)+gameWidth*0.345+"px";
    piece.style.left = offsetX+gameWidth*0.345+"px";
    piece.style.top = offsetY-(piece.height)+gameHeight*0.959641+"px";
}

function copy(o) {
    let obj = jQuery.extend(true, {}, o);
    obj.animations[0].el = o.animations[0].el.cloneNode(false);
    return obj;
}

