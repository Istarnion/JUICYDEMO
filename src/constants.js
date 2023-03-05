/***************************************************/
/*                                                 */
/*    File: constants.js                           */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

if(!Math.TAU) {
    Math.TAU = 2 * Math.PI;
}

const WIDTH = 800;
const HEIGHT = 600;

const DELTA_TIME_SECONDS = 1 / 60;
const DELTA_TIME_MILLIS = DELTA_TIME_SECONDS * 1000;

const ENEMY_SPAWN_DELAY = 2;

const PLAYER_RADIUS = 12;
const PLAYER_BULLET_SPEED = 800;
const PLAYER_SHOOT_COOLDOWN = 0.5;
const ORB_SPACING = PLAYER_RADIUS * 2;

const ENEMY_RADIUS = 14;
const ENEMY_SPEED = 100;
const ENEMY_BULLET_SPEED = 800;
const ENEMY_SHOOT_COOLDOWN = 0.5;
const ENEMY_CLIP_SIZE = 3;
const ENEMY_RELOAD_TIME = 2;

