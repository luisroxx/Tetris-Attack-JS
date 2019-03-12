/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function preCacheAnimations(animArray, callback)
{
    console.log(animArray.length);
    let total = animArray.length;
    let done = 0;
    for(let i=0; i<animArray.length;i++){
        let anim = animArray[i];
        console.log(anim);
        loadSprite(anim.local, function(frames){
            anim.frames = frames;
            createAnimation(anim, function(){
                done++;
                if (total === done){
                    callback();
                }
            });
        });
    }
};
