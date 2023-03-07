/***************************************************/
/*                                                 */
/*    File: enemyspawner.js                        */
/* Created: 2023-03-05                             */
/*  Author: Istarnion                              */
/*                                                 */
/***************************************************/

var lastEnemySpawn = performance.now();

function enemySpawnUpdate(dt) {
    const configurations = [
        [ 50, -50, 50, HEIGHT+50 ],
        [ WIDTH-50, HEIGHT+50, WIDTH-50, -50 ],
        [ WIDTH+50, 50, -50, 50 ],
        [ -50, HEIGHT-50, WIDTH+50, HEIGHT-50 ]
    ];

    const now = performance.now();
    if((now - lastEnemySpawn) / 1000 > ENEMY_SPAWN_DELAY) {
        const configIndex = (Math.random() * configurations.length) | 0;
        const config = configurations[configIndex];

        const xOffset = randomRange(-20, 20);
        const yOffset = randomRange(-20, 20);
        const enemy = new Enemy(config[0]+xOffset, config[1]+yOffset,
                                config[2]+xOffset, config[3]+yOffset);
        enemies.push(enemy);

        lastEnemySpawn = now;
    }
}

