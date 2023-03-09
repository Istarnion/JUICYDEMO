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
        volume: 0.05
    }),
    new Howl({
        src: "res/minigun2.ogg",
        loop: false,
        volume: 0.05
    }),
    new Howl({
        src: "res/minigun3.ogg",
        loop: false,
        volume: 0.05
    })
];

const ENEMY_SHOOT_SFX = [
    new Howl({
        src: "res/pistol.ogg",
        loop: false,
        volume: 0.05
    }),
    new Howl({
        src: "res/pistol2.ogg",
        loop: false,
        volume: 0.05
    }),
    new Howl({
        src: "res/pistol3.ogg",
        loop: false,
        volume: 0.05
    })
];

const PLAYER_DEATH_SFX = new Howl({
    src: "res/death_jack_02.wav",
    loop: false,
    volume: 1.0
});

const ENEMY_DEATH_SFX = [
    new Howl({
        src: "res/Socapex - blub_hurt.wav",
        loop: false,
        volume: 1.0
    }),
    new Howl({
        src: "res/Socapex - blub_hurt2.wav",
        loop: false,
        volume: 1.0
    }),
    new Howl({
        src: "res/Socapex - hurt.wav",
        loop: false,
        volume: 1.0
    }),
    new Howl({
        src: "res/Socapex - Monster_Hurt.wav",
        loop: false,
        volume: 1.0
    })
];

const PROJECTILE_HIT_WALL_SFX = new Howl({
    src: "res/click.wav",
    loop: false,
    volume: 1.0
});

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

