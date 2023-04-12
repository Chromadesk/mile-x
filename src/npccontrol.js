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