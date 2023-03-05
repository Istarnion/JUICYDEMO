/***************************************************/
/*                                                 */
/*    File: player.js                              */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

function Player(x, y) {
    this.x = x;
    this.y = y;

    this.dx = 0;
    this.dy = 0;

    this.direction = 0;
}

Player.prototype.update = function(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
}

Player.prototype.draw = function(dt) {
    gfx.fillStyle = 'white';
    gfx.fillCircle(this.x, this.y, PLAYER_RADIUS);

    const forwardX = Math.cos(this.direction);
    const forwardY = Math.sin(this.direction);

    const orbSpacing = PLAYER_RADIUS * 2;
    const orbRadius = PLAYER_RADIUS * 0.5;

    gfx.fillCircle(this.x + -forwardY * orbSpacing, this.y + forwardX * orbSpacing, orbRadius);
    gfx.fillCircle(this.x + forwardY * orbSpacing, this.y + -forwardX * orbSpacing, orbRadius);

    const eyeRadius = PLAYER_RADIUS * 0.25;
    gfx.fillStyle = 'black';
    gfx.fillCircle(this.x + forwardX * (PLAYER_RADIUS-eyeRadius),
                   this.y + forwardY * (PLAYER_RADIUS-eyeRadius),
                   eyeRadius);
}

