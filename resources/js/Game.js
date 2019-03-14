/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let Game = document.getElementById("game");
const scaledSize = 3;

function start() {
    //preCacheAnimations(TodasAnimacoes,startViewe(VIEWES.SINGLEPLAYER););// quando tudo tiver pronto
    startViewe(VIEWES.ENDLESSMODE);
};

let content = document.getElementById("content");

function openFullscreen() {
    if (content.requestFullscreen) {
        content.requestFullscreen();
    } else if (content.mozRequestFullScreen) { /* Firefox */
        content.mozRequestFullScreen();
    } else if (content.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        
        content.webkitRequestFullscreen();
    } else if (content.msRequestFullscreen) { /* IE/Edge */
        content.msRequestFullscreen();
    }
};

let tempH;
let tempW;

document.addEventListener("fullscreenchange", function(event) {
  if (document.fullscreenElement) {
        tempH = Game.style.height;
        tempW = Game.style.width;
        Game.style.height = "100%";
        alert(Game.offsetHeight);
        alert(Game.getBoundingClientRect().width);
        Game.style.margin = "0 auto";
        Game.style.width = "5em";
      //alert("change");
    // The browser is in full-screen mode, with document.fullscreenElement
    // being the element presented full-screen.
  } else {
    Game.style.height = tempH;
    Game.style.width = tempW;
  }
});
