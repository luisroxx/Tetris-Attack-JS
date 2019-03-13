/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let Game = document.getElementById("game");
const scaledSize = 1;

function start() {
    //preCacheAnimations(TodasAnimacoes,startViewe(VIEWES.SINGLEPLAYER););// quando tudo tiver pronto
    startViewe(VIEWES.ENDLESSMODE);
};

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
};