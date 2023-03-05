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

        const enemy = new Enemy(config[0], config[1], config[2], config[3]);
        enemies.push(enemy);

        lastEnemySpawn = now;
    }
}

