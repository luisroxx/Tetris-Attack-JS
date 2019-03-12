/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let Yoshi_Title = {
    animations: [{
            name: "YOSHI_EYE_BLINK",
            local: {
                spritesheet: 'resources/images/characters/SNES - Tetris Attack - VS Mode Characters.png',
                startX: 141,
                startY: 5,
                width: 62,
                heigth: 41,
                scale: 5,
                transparentColor: TRANSPARENT_COLOR.BLUE,
                styleSheetCrop: STYLESHEET_CROP.HORIZONTAL,
                frames: 3
            },
            el: null,
            is_loaded: false,
            status: ANIMATION_STATUS.STOPPED,
            currFrame: 0,
            currAnimation: null,
            loop: true,
            frames: null,
            frameOrder: [0, 2, 1, 2],
            frameTime: [200, 200, 200, 200]
        }
    ]
};

function startTitle() {
    preCacheAnimations(Yoshi_Title.animations, createScreen);
};

function createScreenTitle() {
    for (let i = 0; i < anims.length; i++) {
        Game.appendChild(anims[i].el);
        startAnimation(anims[i]);
    }
}