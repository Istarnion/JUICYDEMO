/***************************************************/
/*                                                 */
/*    File: juice.js                               */
/* Created: 2023-03-08                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

var BULLET_SPREAD = 0;
var VISUALIZE_HP = false;
var VISUALIZE_AI = false;

var PLAYER_COOL_GUN = false;
var PLAYER_SHOOT_COOLDOWN = 0.6;

var ENEMY_SPAWN_DELAY = 3;
var ENEMY_SHOOT_COOLDOWN = 0.5;

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
    if(juicelevel >= 1) {
        PLAYER_COOL_GUN = true;
    }
    else {
        PLAYER_COOL_GUN = false;
    }

    if(juicelevel >= 2) {
        PLAYER_SHOOT_COOLDOWN = 0.15;
        ENEMY_SPAWN_DELAY = 2;
        ENEMY_SHOOT_COOLDOWN = 0.15;
    }
    else {
        ENEMY_SPAWN_DELAY = 5;
        PLAYER_SHOOT_COOLDOWN = 0.7;
        ENEMY_SHOOT_COOLDOWN = 0.6;
    }

    if(juicelevel >= 3) {
        BULLET_SPREAD = 0.05;
    }
    else {
        BULLET_SPREAD = 0;
    }

    if(juicelevel >= 3) {
        VISUALIZE_HP = true;
        VISUALIZE_AI = true;
    }
    else {
        VISUALIZE_HP = false;
        VISUALIZE_AI = false;
    }
}

