/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const ANIMATION_STATUS = {
    RUNNING: "RUNNING",
    STOPPED: "STOPPED"
};

function createAnimation(animFrames) {
    let body = document.getElementById("game");
    for (let i = 0; i < animFrames.length; i++) {
        let img = new Image();
        img.src = animFrames[i];
        img.style.border = "1px solid red";
        img.onload = function () {
            body.appendChild(this);
        }
    }

    let anim = new Image();
    body.appendChild(anim);
    let animatedObject = {
        el: anim,
        status: ANIMATION_STATUS.RUNNING,
        currFrame: 0,
        frames: animFrames,
        frameOrder: [0, 2, 1, 2],
        frameTime: [1500, 100, 100, 100]
    };
    animatedObject.currFrame = 0;
    anim.src = animatedObject.frames[animatedObject.currFrame];
    anim.onload = function () {
        anim.onload = null;
        //setTimeout(function() { animate(animatedObject); }, 1000);
        setTimeout(animate, animatedObject.frameTime[animatedObject.currFrame], animatedObject);
    }
};

function createAnimation2(animFrames) {
    let body = document.getElementById("game");
    for (let i = 0; i < animFrames.length; i++) {
        let img = new Image();
        img.src = animFrames[i];
        img.style.border = "1px solid red";
        img.onload = function () {
            body.appendChild(this);
        }
    }

    let anim = new Image();
    body.appendChild(anim);
    let animatedObject = {
        el: anim,
        status: ANIMATION_STATUS.RUNNING,
        currFrame: 0,
        frames: animFrames,
        frameOrder: [0, 2, 1, 2],
        frameTime: [200, 200, 200, 200]
    };
    animatedObject.currFrame = 0;
    anim.src = animatedObject.frames[animatedObject.currFrame];
    anim.onload = function () {
        anim.onload = null;
        //setTimeout(function() { animate(animatedObject); }, 1000);
        setTimeout(animate, animatedObject.frameTime[animatedObject.currFrame], animatedObject);
    }
};


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