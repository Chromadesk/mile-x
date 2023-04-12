const playerObject = {
    id: 0,

    maxHealth: 100,
    maxWeight: 0,
    maxHunger: 0,
    maxThirst: 0,
    maxFatigue: 0,
    maxShock: 0,
    maxBleed: 0,
    maxSickness: 0,

    health: 100,
    weight: 0,
    hunger: 0,
    thirst: 0,
    fatigue: 0,
    shock: 0,
    bleed: 0,
    sickness: 0,

    stealth: 50,

    playerCords: [0, 0], //The coordinates of the player on the grid
    playerPoint: null, //The PointData of the player's coordinates
    playerLocal: null, //The location (if any) that the player is inside of
    playerSubLocal: null, //The sublocation (if any) that the player is inside of
}

export default playerObject