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

var SFX = false;
var HIT_PARTICLES = false;

var DEATH_ANIMS = false;
var BULLET_ANIMS = false;

var SCREENSHAKE = false;

var COLOR_BACKGROUND;
var COLOR_WALLS;
var COLOR_HP_BACKGROUND;
var COLOR_HP_BORDER;
var COLOR_HP_FILL;
var COLOR_SCORE;
var COLOR_PROJECTILE;
var COLOR_PROJECTILE_FLASH;
var COLOR_PROJECTILE_WALL_SPARKS;
var COLOR_DEATH_EFFECT;
var COLOR_PLAYER;
var COLOR_PLAYER_EYE;
var COLOR_PLAYER_ORB;
var COLOR_PLAYER_BLOOD;
var COLOR_ENEMY;
var COLOR_ENEMY_EYE;
var COLOR_ENEMY_VIEWCONE;
var COLOR_ENEMY_BLOOD;

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

    if(juicelevel >= 4) {
        VISUALIZE_HP = true;
        VISUALIZE_AI = true;
    }
    else {
        VISUALIZE_HP = false;
        VISUALIZE_AI = false;
    }

    if(juicelevel >= 5) {
        SFX = true;
    }
    else {
        SFX = false;
    }

    if(juicelevel >= 6) {
        HIT_PARTICLES = true;
    }
    else {
        HIT_PARTICLES = false;
    }

    if(juicelevel >= 7) {
        DEATH_ANIMS = true;
        BULLET_ANIMS = true;
    }
    else {
        DEATH_ANIMS = false;
        BULLET_ANIMS = false;
    }

    if(juicelevel >= 8) {
        SCREENSHAKE = true;
    }
    else {
        SCREENSHAKE = false;
    }

    if(juicelevel >= 8) {
        COLOR_BACKGROUND = "#433C43";
        COLOR_WALLS = "#5F4942";
        COLOR_HP_BACKGROUND = "#615A73";
        COLOR_HP_BORDER = "#FFFFFF";
        COLOR_HP_FILL = "#E4534A";
        COLOR_SCORE = "#FFFFFF";
        COLOR_PROJECTILE = "#F3D99B";
        COLOR_PROJECTILE_FLASH = "#FFFFFF";
        COLOR_PROJECTILE_WALL_SPARKS = "#FFFFFF";
        COLOR_DEATH_EFFECT = "#615A73";
        COLOR_PLAYER = "#81AA8E";
        COLOR_PLAYER_EYE = "#433C43";
        COLOR_PLAYER_ORB = "#628168";
        COLOR_PLAYER_BLOOD = "#E4534A";
        COLOR_ENEMY = "#CFAC89";
        COLOR_ENEMY_EYE = "#D98C6D";
        COLOR_ENEMY_VIEWCONE = "rgba(255, 255, 255, 0.2)";
        COLOR_ENEMY_BLOOD = "#D98C6D";
    }
    else {
        COLOR_BACKGROUND = "black";
        COLOR_WALLS = "white";
        COLOR_HP_BACKGROUND = "black";
        COLOR_HP_BORDER = "white";
        COLOR_HP_FILL = "white";
        COLOR_SCORE = "white";
        COLOR_PROJECTILE = "white";
        COLOR_PROJECTILE_FLASH = "white";
        COLOR_PROJECTILE_WALL_SPARKS = "white";
        COLOR_DEATH_EFFECT = "white";
        COLOR_PLAYER = "white";
        COLOR_PLAYER_EYE = "black";
        COLOR_PLAYER_ORB = "white";
        COLOR_PLAYER_BLOOD = "white";
        COLOR_ENEMY = "white";
        COLOR_ENEMY_EYE = "black";
        COLOR_ENEMY_VIEWCONE = "rgba(255, 255, 255, 0.2)";
        COLOR_ENEMY_BLOOD = "white";
    }

}

