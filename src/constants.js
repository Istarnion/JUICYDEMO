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

const DELTA_TIME_SECONDS = 1 / 240;
const DELTA_TIME_MILLIS = DELTA_TIME_SECONDS * 1000;

const PARTICLE_FRICTION = 100;
const MUZZLE_FLASH_TIME = 20; // milliseconds
const DEATH_EFFECT_DURATION = 1;
const TRAUMA_RESTORE_SPEED = 2; // How fast trauma goes back down to zero
const SCREENSHAKE_HARDNESS = 10;
const SHADOW = 2;
const MUSIC_VOLUME = 0.1;

const PROJECTILE_TRAIL_COOLDOWN = 50; // milliseconds
const WALK_TRAIL_COOLDOWN = 250;

const PLAYER_HEALTH = 100;
const PLAYER_RADIUS = 12;
const PLAYER_SPEED = 200;
const PLAYER_BULLET_SPEED = 800;
const PLAYER_BULLET_DAMAGE = 10;
const ORB_SPACING = PLAYER_RADIUS * 2;

const ENEMY_HEALTH = 50;
const ENEMY_RADIUS = 14;
const ENEMY_SPEED = 80;
const ENEMY_WALK_TIME = 1.5;
const ENEMY_LOOK_ANGLE = 0.75;
const ENEMY_FOV = 0.75;
const ENEMY_BULLET_SPEED = 800;
const ENEMY_BULLET_DAMAGE = 5;
const ENEMY_CLIP_SIZE = 3;
const ENEMY_RELOAD_TIME = 2;

