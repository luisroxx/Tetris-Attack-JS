/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const ANIMATION_STATUS = {
    RUNNING: "RUNNING",
    STOPPED: "STOPPED"
};

function testCreateAnimation(animFrames) {
    loadFrames(animFrames);

    let anim = new Image();
    Game.appendChild(anim);
    let animatedObject = {
        el: anim,
        status: ANIMATION_STATUS.RUNNING,
        currFrame: 0,
        frames: animFrames,
        frameOrder: [0, 2, 1, 2],
        frameTime: [1500, 100, 100, 100],
        loop: true
    };
    animatedObject.currFrame = 0;
    anim.src = animatedObject.frames[animatedObject.currFrame];
    anim.onload = function () {
        anim.onload = null;
        //setTimeout(function() { animate(animatedObject); }, 1000);
        setTimeout(animate, animatedObject.frameTime[animatedObject.currFrame], animatedObject);
    }
}
;

function testCreateAnimation2(animFrames) {
    loadFrames(animFrames);
    let anim = new Image();
    Game.appendChild(anim);
    let animatedObject = {
        el: anim,
        status: ANIMATION_STATUS.RUNNING,
        currFrame: 0,
        frames: animFrames,
        frameOrder: [0, 2, 1, 2],
        frameTime: [200, 200, 200, 200],
        loop: true
    };
    animatedObject.currFrame = 0;
    anim.src = animatedObject.frames[animatedObject.currFrame];
    anim.onload = function () {
        anim.onload = null;
        //setTimeout(function() { animate(animatedObject); }, 1000);
        setTimeout(animate, animatedObject.frameTime[animatedObject.currFrame], animatedObject);
    }
}
;

function loadFrames(frames) {
    for (let i = 0; i < frames.length; i++) {
        let img = new Image();
        img.src = frames[i];
        img.onload = function () {
            Game.appendChild(this);
        }
    }
}

function createAnimation(animation, callback) {
    let anim = new Image();
    animation.el = anim;
    anim.onload = function () {
        anim.onload = null;
        animation.is_loaded = true;
        callback();
    }
    resetAnimation(animation);
};

function resetAnimation(animation) {
    animation.status = ANIMATION_STATUS.STOPPED;
    animation.currFrame = 0;
    animation.el.src = animation.frames[animation.currFrame];
}

function startAnimation(animation) {
    animation.status = ANIMATION_STATUS.RUNNING;
    animation.currAnimation = setTimeout(animate, animation.frameTime[animation.currFrame], animation);
}

function stopAnimation(animation) {
    animation.status = ANIMATION_STATUS.STOPPED;
}

function forceStopAnimation(animation) {
    clearTimeout(animation.currAnimation);
    animation.status = ANIMATION_STATUS.STOPPED;
}

function animate(animation) {
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
    } else{
        animation.currFrame++;
    }
    animation.el.src = animation.frames[animation.frameOrder[animation.currFrame]];
    animation.el.onload = function () {
        animation.el.onload = null;
        animation.currAnimation = setTimeout(animate, animation.frameTime[animation.currFrame], animation);
    };
};