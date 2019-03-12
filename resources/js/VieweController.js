/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const VIEWES = {
    TITLESCREEN: {
        FUNCTION: startTitle
    },
    SINGLEPLAYER: {
        FUNCTION: startSinglePlayer
    }
}

function startViewe(viewe) {
    switch (viewe) {
        case VIEWES.TITLESCREEN:
            VIEWES.TITLESCREEN.FUNCTION();
            break;
        case VIEWES.SINGLEPLAYER:
            VIEWES.SINGLEPLAYER.FUNCTION();
            break;
        default:
            throw "Viewe not found"
            break;
    }
}
