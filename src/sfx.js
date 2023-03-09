/***************************************************/
/*                                                 */
/*    File: sfx.js                                 */
/* Created: 2023-03-09                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

const PLAYER_SHOOT_SFX = [
    new Howl({
        src: "res/minigun.ogg",
        loop: false,
        volume: 1.0
    }),
    new Howl({
        src: "res/minigun2.ogg",
        loop: false,
        volume: 1.0
    }),
    new Howl({
        src: "res/minigun3.ogg",
        loop: false,
        volume: 1.0
    })
];

const ENEMY_SHOOT_SFX = [
    new Howl({
        src: "res/pistol.ogg",
        loop: false,
        volume: 0.5
    }),
    new Howl({
        src: "res/pistol2.ogg",
        loop: false,
        volume: 0.5
    }),
    new Howl({
        src: "res/pistol3.ogg",
        loop: false,
        volume: 0.5
    })
];

function playSfx(sfx) {
    if(SFX) {
        if(Array.isArray(sfx)) {
            const index = (Math.random() * sfx.length) | 0;
            sfx[index].play();
        }
        else {
            sfx.play();
        }
    }
}

