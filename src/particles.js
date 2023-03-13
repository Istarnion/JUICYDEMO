/***************************************************/
/*                                                 */
/*    File: particles.js                           */
/* Created: 2023-03-10                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

const particles = [];
var particleCount = 0;

function spawnParticle(p) {
    if(particleCount === particles.length) {
        particles.push(p);
    }
    else {
        particles[particleCount] = p;
    }

    ++particleCount;
}

function particleBurst(count, x, y, radius, fromDirection, toDirection, force, color) {
    for(var i=0; i<count; ++i) {
        const loc = randomInsideUnitCircle();
        const dir = randomRange(fromDirection, toDirection);

        spawnParticle({
            x: x + loc[0] * radius,
            y: y + loc[1] * radius,
            dx: Math.cos(dir) * force,
            dy: Math.sin(dir) * force,
            color: color,
            ttl: randomRange(0.5, 1.0)
        });
    }
}

function particlesUpdate(dt) {
    const epsilon_velocity = 0.1;
    for(var i=0; i<particleCount; ++i) {
        const p = particles[i];
        p.ttl -= dt;

        if(Math.abs(p.dx) > epsilon_velocity) {
            p.dx -= Math.sign(p.dx) * PARTICLE_FRICTION * dt;
        }

        if(Math.abs(p.dy) > epsilon_velocity) {
            p.dy -= Math.sign(p.dy) * PARTICLE_FRICTION * dt;
        }

        p.x += p.dx * dt;
        p.y += p.dy * dt;
    }

    // Find holes in the array and fill them by moving down the
    // particles at the end of the array.
    const oldParticleCount = particleCount;
    for(var i=0; i<oldParticleCount; ++i) {
        const p = particles[i];
        if(p.ttl <= 0) {
            --particleCount;
            if(i < particleCount) {
                particles[i] = particles[particleCount];
            }
        }
    }
}

function particlesDraw() {
    for(var i=0; i<particleCount; ++i) {
        const p = particles[i];
        gfx.fillStyle = p.color;
        gfx.fillRect(p.x-1, p.y-1, 2, 2);
    }
}

