const gameContextObject = {
    playerPos: [0, 0],
    playerPoint: null,
    playerLocal: null,
    playerSubLocal: null,
    getPlayerPointNames() {
        let names = [];
        for (let location of this.playerPoint) {
            names.push(location.name)
        }
        return names
    },
    map: [],
    mapSize: null,
    roadSize: null,
}

export default gameContextObject