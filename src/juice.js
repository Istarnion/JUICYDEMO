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
var MUSIC = false;
var HIT_PARTICLES = false;
var EXTRA_PARTICLES = false;

var DEATH_ANIMS = false;
var BULLET_ANIMS = false;
var RECOIL = false;

var SCREENSHAKE = false;

var COLOR_BACKGROUND;
var COLOR_WALLS;
var COLOR_HP_BACKGROUND;
var COLOR_HP_BORDER;
var COLOR_HP_FILL;
var COLOR_SCORE;
var COLOR_PROJECTILE_PLAYER;
var COLOR_PROJECTILE_ENEMY;
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
var SHADOWS = false;

var TWEENING = false;
var CRAZY = false;

juicelevel = 0;
const MAX_JUICE_LEVEL = 12;

function moreJuice() {
    juicelevel++;
    if(juicelevel > MAX_JUICE_LEVEL) juicelevel = MAX_JUICE_LEVEL;
    updateJuicyness();
}

function lessJuice() {
    juicelevel--;
    if(juicelevel < 0) juicelevel = 0;
    updateJuicyness();
}

function maxJuice() {
    juicelevel = MAX_JUICE_LEVEL;
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
        BULLET_SPREAD = 0.05;
    }
    else {
        ENEMY_SPAWN_DELAY = 5;
        PLAYER_SHOOT_COOLDOWN = 0.7;
        ENEMY_SHOOT_COOLDOWN = 0.6;
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

    if(juicelevel >= 4) {
        SFX = true;
    }
    else {
        SFX = false;
    }

    if(juicelevel >= 5) {
        HIT_PARTICLES = true;
    }
    else {
        HIT_PARTICLES = false;
    }

    if(juicelevel >= 6) {
        DEATH_ANIMS = true;
        BULLET_ANIMS = true;
        RECOIL = true;
    }
    else {
        DEATH_ANIMS = false;
        BULLET_ANIMS = false;
        RECOIL = false;
    }

    if(juicelevel >= 7) {
        SCREENSHAKE = true;
    }
    else {
        SCREENSHAKE = false;
    }

    if(juicelevel >= 8) {
        SHADOWS = true;
        COLOR_BACKGROUND = "#1a2331";
        COLOR_WALLS = "#5f707f";
        COLOR_HP_BACKGROUND = "#000000";
        COLOR_HP_BORDER = "#86fbee";
        COLOR_HP_FILL = "#e94f49";
        COLOR_SCORE = "#86fbee";
        COLOR_PROJECTILE_PLAYER = "#e0fefc";
        COLOR_PROJECTILE_ENEMY = "#fdf4b0";
        COLOR_PROJECTILE_FLASH = "#FFFFFF";
        COLOR_PROJECTILE_WALL_SPARKS = "#FFFFFF";
        COLOR_DEATH_EFFECT = "#FFFFFF";
        COLOR_PLAYER = "#86fbee";
        COLOR_PLAYER_EYE = "#000000";
        COLOR_PLAYER_ORB = "#4da8b0";
        COLOR_PLAYER_BLOOD = "#e94f49";
        COLOR_ENEMY = "#e73e46";
        COLOR_ENEMY_EYE = "#000000";
        COLOR_ENEMY_VIEWCONE = "rgba(232, 62, 70, 0.2)";
        COLOR_ENEMY_BLOOD = "#e73e46";
    }
    else {
        SHADOWS = false;
        COLOR_BACKGROUND = "black";
        COLOR_WALLS = "white";
        COLOR_HP_BACKGROUND = "black";
        COLOR_HP_BORDER = "white";
        COLOR_HP_FILL = "white";
        COLOR_SCORE = "white";
        COLOR_PROJECTILE_PLAYER = "white";
        COLOR_PROJECTILE_ENEMY = "white";
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

    if(juicelevel >= 9) {
        MUSIC = true;
        if(!bgm.playing()) {
            bgm.volume(MUSIC_VOLUME);
            bgm.play();
        }
    }
    else {
        MUSIC = false;
        bgm.stop();
    }

    if(juicelevel >= 10) {
        EXTRA_PARTICLES = true;
    }
    else {
        EXTRA_PARTICLES = false;
    }

    if(juicelevel >= 11) {
        TWEENING = true;
    }
    else {
        TWEENING = false;
    }

    if(juicelevel >= 12) {
        CRAZY = true;
    }
    else {
        CRAZY = false;
    }
}

