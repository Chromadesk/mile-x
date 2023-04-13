import gameContextObject from "./gamecontrol"
import playerObject from "./playercontrol"

export class NPC {
    health = 100
    isActive = false
    NPCLocal = null
    NPCSubLocal = null

    constructor(faction, cords, point) {
        this.faction = faction
        this.NPCCords = cords
        this.NPCPoint = point
        gameContextObject.register(this)
    }

    chasePlayer() {
        if (this.isActive) {
            //X
            if (this.NPCCords[0] !== playerObject.playerCords[0]) {
                if (playerObject.playerCords[0] - this.NPCCords[0] > 0) {
                    this.NPCCords[0] += 1
                }
                if (playerObject.playerCords[0] - this.NPCCords[0] < 0) {
                    this.NPCCords[0] -= 1
                }
            }
            //Y
            if (this.NPCCords[1] !== playerObject.playerCords[1]) {
                if (playerObject.playerCords[1] - this.NPCCords[1] > 0) {
                    this.NPCCords[1] += 1
                }
                if (playerObject.playerCords[1] - this.NPCCords[1] < 0) {
                    this.NPCCords[1] -= 1
                }
            }
            console.log(`Zombie ${this.id} is chasing the player. Zombie [${this.NPCCords}] Player [${playerObject.playerCords}]`)
        }
    }
}

/**
 * Checks player's stealth to see if the inputted NPC noticed the player.
 * @param {NPC} NPC An NPC character.
 * @returns Boolean
 */
export function didNPCNoticePlayer(NPC) {
    if (playerObject.stealth >= Math.round(Math.random() * 100)) {
        return false
    }
    NPC.isActive = true
    playerObject.pursuers.push(NPC)
    return true
}

export function findNPCsByFaction(NPCArray, factionName) {
    let findings = []
    for (let NPC of NPCArray) {
        if (NPC.faction === factionName) {
            findings.push(NPC)
        }
    }
    return findings
}
