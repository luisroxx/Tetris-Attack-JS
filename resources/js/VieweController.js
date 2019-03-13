/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const VIEWES = {
    TITLESCREEN: {
        FUNCTION: startTitle
    },
    ENDLESSMODE: {
        FUNCTION: startEndlessMode
    }
}

let currentViewe;
let vieweEndlessMode;

function startViewe(viewe) {
    switch (viewe) {
        case VIEWES.TITLESCREEN:
            VIEWES.TITLESCREEN.FUNCTION();
            break;
        case VIEWES.ENDLESSMODE:
            if (currentViewe!=null){
                Game.removeChild(currentViewe);
            }
            vieweEndlessMode = document.createElement("div");
            currentViewe = vieweEndlessMode;
            vieweEndlessMode.style.width = "100%";
            vieweEndlessMode.style.height = "100%";
            Game.appendChild(vieweEndlessMode);
            VIEWES.ENDLESSMODE.FUNCTION();
            break;
        default:
            throw "Viewe not found"
            break;
    }
}
