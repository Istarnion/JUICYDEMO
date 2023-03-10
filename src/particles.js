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

function particlesUpdate(dt) {
    for(var i=0; i<particleCount; ++i) {
        const p = particles[i];
        gfx.fillStyle = p.color;
        gfx.fillRect(p.x-1, p.y-1, 2, 2);
    }

    // Find holes in the array and fill them by moving down the
    // particles at the end of the array.
    const oldParticleCount = particleCount;
    for(var i=0; i<oldParticleCount; ++i) {
        const p = particles[i];
        if(!p.active) {
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

