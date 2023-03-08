/***************************************************/
/*                                                 */
/*    File: juice.js                               */
/* Created: 2023-03-08                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

var PLAYER_COOL_GUN = false;

juicelevel = 0;
const MAX_JUICE_LEVEL = 12;

function moreJuice() {
    juicelevel++;
    if(juicelevel >= MAX_JUICE_LEVEL) juicelevel = MAX_JUICE_LEVEL-1;
    updateJuicyness();
}

function lessJuice() {
    juicelevel--;
    if(juicelevel < 0) juicelevel = 0;
    updateJuicyness();
}

function maxJuice() {
    juicelevel = MAX_JUICE_LEVEL-1;
    updateJuicyness();
}

function noJuice() {
    juicelevel = 0;
    updateJuicyness();
}

function updateJuicyness() {
    PLAYER_COOL_GUN = juicelevel > 0;
}

