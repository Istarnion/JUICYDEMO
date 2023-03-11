/***************************************************/
/*                                                 */
/*    File: effects.js                             */
/* Created: 2023-03-10                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

function DeathEffect(x, y) {
    this.x = x;
    this.y = y;
    this.done = false;
    this.spawnTime = performance.now();
}

DeathEffect.prototype.draw = function() {
    const secondsAlive = (performance.now() - this.spawnTime) / 1000;
    const radius = WIDTH * (secondsAlive / DEATH_EFFECT_DURATION);

    gfx.strokeStyle = COLOR_DEATH_EFFECT;
    gfx.circle(this.x, this.y, radius);

    if(secondsAlive >= DEATH_EFFECT_DURATION) {
        this.done = true;
    }
}

