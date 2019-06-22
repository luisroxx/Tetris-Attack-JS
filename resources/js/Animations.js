/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const ANIMATION_STATUS = {
    RUNNING: "RUNNING",
    STOPPED: "STOPPED"
};
class GameObject {
    constructor(animations) {
        this.animation = null;
        this.animations = animations;
    }

    getAnimation(name) {
        for (let anim of this.animations) {
            if (anim.name === name) {
                return anim;
            }
        }
        return null;
    }

    setAnimationByName(name, callback) {
        let anim = getAnimation(name);
        if (anim == null) {
            return;
        }
        setAnimationByAnimation(anim, callback);
    }

    setAnimationByAnimation(anim, callback) {
        this.animation = anim;
        this.animation.el = new Image();
        this.animation.onload = function () {
            this.animation.onload = null;
            this.animation.is_loaded = true;
            callback();
        }
        resetCurrentAnimation(anim);
    }

    resetCurrentAnimation(animation) {
        this.animation.status = ANIMATION_STATUS.STOPPED;
        this.animation.currFrame = 0;
        this.animation.el.src = animation.frames[animation.currFrame];
    }

    startAnimation(name) {
        let anim = getAnimation(name);
        if (anim == null) {
            return;
        }
        setAnimationByAnimation(name, startAnim);
    }

    startAnim() {
        this.animation.status = ANIMATION_STATUS.RUNNING;
        this.animation.currAnimation = setTimeout(animate, this.animation.frameTime[this.animation.currFrame], animation);
    }

    stopAnimation(name) {
        let anim = getAnimation(name);
        if (anim == null) {
            return;
        }
        this.animation.status = ANIMATION_STATUS.STOPPED;
    }

    forceStopAnimation(name) {
        let anim = getAnimation(name);
        if (anim == null) {
            return;
        }
        clearTimeout(this.animation.currAnimation);
        this.animation.status = ANIMATION_STATUS.STOPPED;
    }

    animate(animation) {
        if (animation.status === ANIMATION_STATUS.STOPPED) {
            return;
        }
        ;
        if (animation.currFrame === animation.frameOrder.length - 1)
        {
            if (!animation.loop) {
                return;
            } else {
                animation.currFrame = 0;
            }
        } else {
            animation.currFrame++;
        }
        animation.el.src = animation.frames[animation.frameOrder[animation.currFrame]];
        animation.el.onload = function () {
            animation.el.onload = null;
            animation.currAnimation = setTimeout(animate, animation.frameTime[animation.currFrame], animation);
        };
    };
}

class Animation {
    constructor(animation) {
        this.name = animation.name,
                this.local = animation.local,
                /* this.local = {
                 spritesheet: animation.local.spritesheet,
                 startX: animation.local.startX,
                 startY: animation.local.startY,
                 width: animation.local.width,
                 heigth: animation.local.heigth,
                 scale: animation.local.scale,
                 transparentColor: animation.local.transparentColor,
                 styleSheetCrop: animation.local.styleSheetCrop,
                 frames: animation.local.frames
                 }, */
                this.el = null,
                this.is_loaded = false,
                this.status = ANIMATION_STATUS.STOPPED,
                this.currFrame = 0,
                this.currAnimation = null,
                this.loop = animation.loop,
                this.frames = null,
                this.frameOrder = animation.frameOrder,
                this.frameTime = animation.frameTime
    }
}

let BACKGROUNDS;
let BG_YOSHI = new Animation({
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
    loop: true,
    frameOrder: [0],
    frameTime: [1000]
});

BACKGROUNDS = new GameObject([BG_YOSHI]);

let CURSOR;
let CURSOR_ANIM = new Animation({
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
    loop: true,
    frameOrder: [0],
    frameTime: [1000]
});

CURSOR = new GameObject(CURSOR_ANIM);
CURSOR.position = {
    x: 0,
    y: 0
};


let GREEN_BLOCK;
let GREEN_BLOCK_IDLE = new Animation({
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
    loop: true,
    frameOrder: [0],
    frameTime: [1000]
});


GREEN_BLOCK = new GameObject(GREEN_BLOCK_IDLE);