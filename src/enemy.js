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

            if(angleToPlayer <= ENEMY_FOV && !lineIntersectsWalls(this.x, this.y, player.x, player.y)) {
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
                    const shotDir = this.direction + randomRange(-BULLET_SPREAD, BULLET_SPREAD);
                    new Projectile(this.x, this.y, shotDir, ENEMY_BULLET_SPEED, 4, PROJECTILE_MASK_ENEMY);
                    playSfx(ENEMY_SHOOT_SFX);

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

    const collision = move(this.x, this.y, ENEMY_RADIUS, this.dx, this.dy);
    this.x = collision.x;
    this.y = collision.y;

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
    if(HIT_PARTICLES) {
        particleBurst(5, this.x, this.y, ENEMY_RADIUS, 0, Math.TAU, 100, "white");
    }

    if(this.health <= 0) {
        playSfx(ENEMY_DEATH_SFX);
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

    if(VISUALIZE_AI) {
        const alpha = this.direction - ENEMY_FOV/2;
        const ax = this.x + Math.cos(alpha) * ENEMY_RADIUS * 3;
        const ay = this.y + Math.sin(alpha) * ENEMY_RADIUS * 3;

        const beta = this.direction + ENEMY_FOV/2;
        const bx = this.x + Math.cos(beta) * ENEMY_RADIUS * 3;
        const by = this.y + Math.sin(beta) * ENEMY_RADIUS * 3;

        gfx.fillStyle = "rgba(255, 255, 255, 0.2)";
        gfx.beginPath();
        gfx.moveTo(this.x, this.y);
        gfx.lineTo(ax, ay);
        gfx.arc(this.x, this.y,
                ENEMY_RADIUS * 4,
                this.direction - ENEMY_FOV/2,
                this.direction + ENEMY_FOV/2);
        gfx.moveTo(this.x, this.y);
        gfx.lineTo(bx, by);
        gfx.fill();
    }
}

