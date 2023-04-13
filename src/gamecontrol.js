import { moveNPCToCoords, runFunctionOnEntireMap } from "./mapcontrol"
import playerObject from "./playercontrol"

const gameContextObject = {
    map: [], //The grid map of the game
    player: playerObject, //The playerObject
    mapSize: null, //The length and height of the game (game is always a grid so its always 1 number)
    pointSize: null, //How many locations are in 1 point
    zombieSpawnRate: 2, //The chance of a zombie to spawn in a point
    zombieSpawnTries: 10, //How many times the game tries to spawn a zombie in a point
    allNPCs: [],

    nextId: 1, //Don't change - The ID which the next object that uses register() will recieve
    register(i) {
        i.id = this.nextId
        this.nextId++
    },
    focusNPC: null,
    hamburger: true
}

/**
 * Runs every time a new event is handled.
 */
export function passTime() {
    doNPCChasing()
    doNPCWandering()
    console.log(gameContextObject.focusNPC)
}

function doNPCChasing() {
    for (let npc of playerObject.pursuers) {
        npc.chasePlayer()
    }
}

function doNPCWandering() {
    for (let npc of gameContextObject.allNPCs) {
        if (!npc.isActive) {
            let rand = Math.round(Math.random() * 4)
            let x = npc.NPCCords[0]
            let y = npc.NPCCords[1]
            if (rand === 1) {
                moveNPCToCoords(npc, [x + 1, y])
            }
            if (rand === 2) {
                moveNPCToCoords(npc, [x - 1, y])
            }
            if (rand === 3) {
                moveNPCToCoords(npc, [x, y + 1])
            }
            if (rand === 4) {
                moveNPCToCoords(npc, [x, y - 1])
            }

            if (gameContextObject.hamburger) {
                gameContextObject.focusNPC = npc
                gameContextObject.hamburger = false
            }
        }
    }
}

function getPointByID(id) {
    runFunctionOnEntireMap((point) => {
        if (point.id === id) return point
    })
    return null
}

function getNPCByID(id) {
    runFunctionOnEntireMap((point) => {
        for (let npc of point.NPCs) {
            if (npc.id === id) return npc
        }
    })
    return null
}

export default gameContextObject