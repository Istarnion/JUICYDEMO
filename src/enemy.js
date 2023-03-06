/***************************************************/
/*                                                 */
/*    File: enemy.js                               */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

const ENEMY_STATE_WALK = 0;
const ENEMY_STATE_LOOK = 1;
const ENEMY_STATE_ATTACK = 2;

function Enemy(x, y, dstX, dstY) {
    this.x = x;
    this.y = y;
    this.dstX = dstX;
    this.dstY = dstY;

    this.dx = 0;
    this.dy = 0;
    this.direction = Math.atan2(dstY - y, dstX - x);
    this.health = ENEMY_HEALTH;

    this.timeInState = 0;
    this.state = ENEMY_STATE_WALK;
    this.lookStartDirection = 0;
    this.lookProgress = 0;
    this.cooldown = 0;
    this.shotsFired = 0;

    this.active = true;
}

Enemy.prototype.update = function(dt) {
    const toDstX = this.dstX - this.x;
    const toDstY = this.dstY - this.y;
    const toGo = Math.sqrt(toDstX*toDstX + toDstY*toDstY);
    if(toGo < ENEMY_RADIUS) {
        this.active = false;
        return;
    }

    switch(this.state) {
        case ENEMY_STATE_WALK:
            this.dx = toDstX / toGo * ENEMY_SPEED;
            this.dy = toDstY / toGo * ENEMY_SPEED;
            this.direction = Math.atan2(this.dy, this.dx);

            if(this.timeInState >= ENEMY_WALK_TIME) {
                this.setState(ENEMY_STATE_LOOK);
                this.lookStartDirection = this.direction;
                this.lookProgress = 0;
            }
            break;
        case ENEMY_STATE_LOOK:
            this.lookProgress = this.timeInState * 3;
            this.direction = this.lookStartDirection + Math.sin(this.lookProgress) * ENEMY_LOOK_ANGLE;

            const distToPlayer = dist(player.x, player.y, this.x, this.y);
            const toPlayerX = (player.x - this.x) / distToPlayer;
            const toPlayerY = (player.y - this.y) / distToPlayer;
            const angleToPlayer = Math.acos(dot(Math.cos(this.direction), Math.sin(this.direction),
                                                toPlayerX, toPlayerY));

            if(angleToPlayer <= ENEMY_FOV) {
                this.setState(ENEMY_STATE_ATTACK);
                this.direction = Math.atan2(toPlayerY, toPlayerX);
                this.cooldown = ENEMY_SHOOT_COOLDOWN;
                this.shotsFired = 0;
            }
            else if(this.lookProgress >= Math.TAU) {
                this.setState(ENEMY_STATE_WALK);
            }
            break;
        case ENEMY_STATE_ATTACK:
            if(this.cooldown <= 0) {
                if(this.shotsFired < ENEMY_CLIP_SIZE) {
                    new Projectile(this.x, this.y, this.direction, ENEMY_BULLET_SPEED, 4, PROJECTILE_MASK_ENEMY);

                    this.cooldown = ENEMY_SHOOT_COOLDOWN;
                    this.shotsFired++;
                }
                else {
                    this.setState(ENEMY_STATE_WALK);
                }
            }

            this.cooldown -= dt;
            break;
        default:
            console.err("Enemy in invalid state", this);
            break;
    }

    this.x += this.dx * dt;
    this.y += this.dy * dt;

    this.timeInState += dt;
}

Enemy.prototype.setState = function(newState) {
    this.state = newState;
    this.timeInState = 0;
    this.dx = 0;
    this.dy = 0;
}

Enemy.prototype.hit = function() {
    if(!this.active) return;

    this.health -= PLAYER_BULLET_DAMAGE;
    if(this.health <= 0) {
        this.active = false;
        score++;
    }
}

Enemy.prototype.draw = function() {
    gfx.fillStyle = "white";
    gfx.fillCircle(this.x, this.y, ENEMY_RADIUS);

    const forwardX = Math.cos(this.direction);
    const forwardY = Math.sin(this.direction);
    const eyeRadius = ENEMY_RADIUS * 0.25;
    gfx.fillStyle = 'black';
    gfx.fillCircle(this.x + forwardX * (PLAYER_RADIUS-eyeRadius),
                   this.y + forwardY * (PLAYER_RADIUS-eyeRadius),
                   eyeRadius);
}

