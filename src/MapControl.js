import gameContextObject from "./gamecontrol"
import playerObject from "./playercontrol"
import { NPC } from "./npccontrol"

class Location {
    constructor(name, rarity, isIndoor, subLocations) {
        this.name = name
        this.rarity = rarity
        this.isIndoor = isIndoor
        this.subLocations = subLocations
        gameContextObject.register(this)
    }
}
class SubLocation {
    constructor(name, lockChance) {
        this.name = name
        this.items = null
        this.lockChance = lockChance
        this.loot = []
        gameContextObject.register(this)
    }
}

class PointData {
    cords = null
    locations = []
    NPCs = []
    zoning = null //future

    constructor() {
        gameContextObject.register(this)
    }
}

let livingRoom = new SubLocation('Living Room', 0)
let subRoad = new SubLocation('Road', 0)
let mainArea = new SubLocation('Main Area', 0)
let bathroom = new SubLocation('Bathroom', 0)
let bedroom = new SubLocation('Bedroom', 5)
let kitchen = new SubLocation('Kitchen', 0)
let subOffice = new SubLocation('Office', 5)
let room = new SubLocation('Room', 15)
let hallway = new SubLocation('Hallway', 0)
let garage = new SubLocation('Garage', 0)
let basement = new SubLocation('Basement', 0)
let storageHouse = new SubLocation('Storage Room', 15)
let storageTool = new SubLocation('Storage Room', 20)
let storageWeapon = new SubLocation('Storage Room', 45)
let armory = new SubLocation('Armory', 95)
let aisleTool = new SubLocation('Tool Section', 0)
let aisleFood = new SubLocation('Food Section', 0)
let aisleMedicene = new SubLocation('Medical Section', 0)
let counter = new SubLocation('Counter', 0)
let cell = new SubLocation('Cell', 95)
let lockerRoom = new SubLocation('Locker Room', 0)
let pond = new SubLocation('Pond', 0)
let subForest = new SubLocation('Forest', 0)
let deepForest = new SubLocation('Deep Forest', 0)
let meadow = new SubLocation('Meadow', 0)
let subParkingLot = new SubLocation('Parking Lot', 0)

//Houses
let house1 = new Location("House", 60, true, [livingRoom, bathroom, bedroom, kitchen, subOffice])
let house2 = new Location("House", 60, true, [livingRoom, bathroom, bedroom, kitchen, basement, garage])
let house3 = new Location("House", 60, true, [livingRoom, bathroom, bedroom, kitchen, storageHouse])

//Stores
let store1 = new Location("Grocery Store", 30, true, [mainArea, aisleFood, bathroom, storageHouse])
let store2 = new Location("Clothing Store", 40, true, [mainArea, bathroom, storageHouse])
let store3 = new Location("Farm Store", 30, true, [mainArea, bathroom, storageTool, aisleTool, aisleFood])
let store4 = new Location("Corner Store", 20, true, [mainArea, aisleFood, aisleMedicene, bathroom])
let store5 = new Location("Furniture Store", 30, true, [mainArea, bathroom])
let storeTool = new Location("Tool Store", 10, true, [mainArea, aisleTool, bathroom, storageTool])
let storeGun = new Location("Gunshop", 3, true, [mainArea, counter, bathroom, armory])
let storeMechanic = new Location("Mechanic Shop", 10, true, [mainArea, bathroom, garage, storageTool])
let storeCar = new Location("Car Store", 5, true, [mainArea, bathroom, garage, storageTool])

//Offices & Apartments
let office = new Location("Office", 30, true, [mainArea, bathroom])
let apartmentBuilding = new Location("Apartment Building", 30, true, [hallway, room, bathroom])
let doctorOffice = new Location("Doctors Office", 10, true, [mainArea, subOffice, bathroom, storageTool])
let policeStation = new Location("Police Station", 7, true, [mainArea, garage, armory, bathroom, cell, lockerRoom])
let warehouse = new Location("Warehouse", 4, true, [mainArea, garage, bathroom])

//Outdoor & Connectors (i.e roads/paths)
let park = new Location("Park", 15, false, [mainArea, bathroom, pond])
let forest = new Location("Forest", 10, false, [subForest, deepForest, meadow, pond])
let road = new Location("Road", 100, false, [subRoad])
let parkingLot = new Location("Parking Lot", 40, false, [subParkingLot])

//All locations except road
let allLocations = [
    house1, house2, house3, store1, store2, store3, store4, store5, storeTool,
    storeGun, storeTool, storeMechanic, storeCar, office, apartmentBuilding,
    doctorOffice, policeStation, warehouse, park, forest, parkingLot]

function generatePoint(maxLocations) {
    let point = new PointData()
    while (point.locations.length < maxLocations) {
        let i = allLocations[Math.round(Math.random() * (allLocations.length - 1))]
        if (i.rarity >= Math.round(Math.random() * 100)) {
            point.locations.push(i)
        }
    }
    gameContextObject.pointSize = maxLocations;
    return point
}

function spawnZombiesAtPoint(point) {
    for (let i = 0; i < gameContextObject.zombieSpawnTries; i++) {
        if (gameContextObject.zombieSpawnRate >= Math.round(Math.random() * 100)) {
            point.NPCs.push(new NPC("infected", point.cords, point))
        }
    }
}

/**
 * Moves the player to an XY position on the grid and passess time while doing so.
 * @param {number} x The X coordinate on the map grid.
 * @param {number} y The Y coordinate on the map grid.
 */
export function movePlayerToPoint(x, y) {
    let point = getAtXY(x, y)
    playerObject.playerPoint = getAtXY(x, y)
    playerObject.playerCords = [x, y]
}

/**
 * Moves the player to an XY position on the grid without passing time.
 * @param {number} x The X coordinate on the map grid.
 * @param {number} y The Y coordinate on the map grid.
 */
function teleportPlayerToPoint(x, y) {
    playerObject.playerPoint = getAtXY(x, y)
    playerObject.playerCords = [x, y]
}

function addCoordsToPoints() {
    for (let x = 0; x < gameContextObject.map.length; x++) {
        for (let y = 0; y < gameContextObject.map[x].length; y++) {
            let point = getAtXY(x, y)
            point.cords = [x, y]
        }
    }
}

/**
 * Runs a function on every PointData object on the map grid, inserting the PointData object as a parameter.
 * @param {Function} func The function to be run.
 */
export function runFunctionOnEntireMap(func) {
    for (let x = 0; x < gameContextObject.map.length; x++) {
        for (let y = 0; y < gameContextObject.map[x].length; y++) {
            let point = getAtXY(x, y)
            func(point)
        }
    }
}

export function generateMap(size) {
    while (gameContextObject.map.length < size) {
        let yAxis = []
        while (yAxis.length < size) {
            yAxis.push(generatePoint(5))
        }
        let yAxisCopy = [...yAxis]
        gameContextObject.map.push(yAxisCopy)
        yAxis.length = 0
    }
    teleportPlayerToPoint(Math.round(size / 2), Math.round(size / 2))
    addCoordsToPoints()
    runFunctionOnEntireMap(spawnZombiesAtPoint)
    gameContextObject.mapSize = size;
    return gameContextObject.map
}

export function getAtXY(x, y) {
    return gameContextObject.map[x][y]
}

export function moveNPCToCoords(npc, coords) {
    const oldPoint = getAtXY(...npc.NPCCords)
    oldPoint.NPCs.splice(oldPoint.NPCs.indexOf(npc), 1)
    npc.NPCCords = coords
    console.log(getAtXY(...coords))
    getAtXY(...npc.NPCCords).NPCs.push(npc)
}