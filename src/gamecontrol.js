const gameContextObject = {
    playerCords: [0, 0], //The coordinates of the player on the grid
    playerPoint: null, //The PointData of the player's coordinates
    playerLocal: null, //The location (if any) that the player is inside of
    playerSubLocal: null, //The sublocation (if any) that the player is inside of
    map: [], //The grid map of the game
    mapSize: null, //The length and height of the game (game is always a grid so its always 1 number)
    pointSize: null, //How many locations are in 1 point
    nextId: 0, //Don't change - The ID which the next object that uses register() will recieve
    zombieSpawnRate: 35, //The chance of a zombie to spawn in a point
    zombieSpawnTries: 7, //How many times the game tries to spawn a zombie in a point
    register(object) {
        object.id = this.nextId
        this.nextId++
    }
}

export default gameContextObject