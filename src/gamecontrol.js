import { runFunctionOnEntireMap } from "./mapcontrol"
import playerObject from "./playercontrol"

const gameContextObject = {
    map: [], //The grid map of the game
    player: playerObject, //The playerObject
    mapSize: null, //The length and height of the game (game is always a grid so its always 1 number)
    pointSize: null, //How many locations are in 1 point
    nextId: 1, //Don't change - The ID which the next object that uses register() will recieve
    zombieSpawnRate: 2, //The chance of a zombie to spawn in a point
    zombieSpawnTries: 10, //How many times the game tries to spawn a zombie in a point
    register(object) {
        object.id = this.nextId
        this.nextId++
    }
}

export function passTime() {
    npcChaseCheck()
}

// function npcCheckup() {
//     runFunctionOnEntireMap((point) => {
//         for (let npc of point.NPCs) {
//             npc.chasePlayer()
//         }
//     })
// }

function npcChaseCheck() {
    for (let npc of playerObject.pursuers) {
        npc.chasePlayer()
    }
}

export default gameContextObject