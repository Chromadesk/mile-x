const gameContextObject = {
    playerCords: [0, 0],
    playerPoint: null,
    playerLocal: null,
    playerSubLocal: null,
    map: [],
    mapSize: null,
    pointSize: null,
    nextId: 0,
    zombieSpawnRate: 35,
    maxZombiesInPoint: 7,
    register(object) {
        object.id = this.nextId
        this.nextId++
    }
}

export default gameContextObject