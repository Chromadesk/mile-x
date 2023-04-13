import { getNamesFromArray } from "../Events"
import { didNPCNoticePlayer, findNPCsByFaction } from "../npccontrol"
import eventDirectionalMovement from "./eventDirectionalMovement"
import eventSubLocationMovement from "./eventSubLocationMovement"

const eventLocationMovement = {
    name: "eventLocationMovement",
    unique: false,
    play: (context, vars) => {
        const player = context.player
        //Second run
        if (vars === player.playerPoint.locations.length) {
            return ({
                text: "You choose to continue moving.",
                buttons: null,
                endEvent: true,
                nextEvent: eventDirectionalMovement,
                effect: null
            })
        }
        if (vars >= 0 && vars < player.playerPoint.locations.length) {
            return ({
                text: `You enter the ${player.playerPoint.locations[vars].name}.`,
                buttons: null,
                endEvent: true,
                nextEvent: eventSubLocationMovement,
                effect: () => {
                    context.playerLocal = player.playerPoint.locations[vars]
                    console.log(player.playerLocal)
                }
            })
        }
        //First run
        let pursuerWarning = ""
        if (player.pursuers.length > 0) {
            pursuerWarning = `${player.pursuers.length} zombies are still chasing after you. `
        }
        if (player.playerPoint.NPCs.length <= 0) {
            return ({
                text: `You are on a road. ${pursuerWarning}Where do you go next?`,
                buttons: [...getNamesFromArray(player.playerPoint.locations), "Leave Road"],
                endEvent: false,
                nextEvent: null,
                effect: null
            })
        } else {
            let npcsActive = 0
            for (let zombie of findNPCsByFaction(player.playerPoint.NPCs, "infected")) {
                if (didNPCNoticePlayer(zombie)) {
                    npcsActive += 1
                }
            }

            if (npcsActive < 1) {
                return ({
                    text: `You are on a road. ${pursuerWarning}You see ${player.playerPoint.NPCs.length} zombies here,
                    but none have noticed you yet (Stealth ${player.stealth}). What do you do next?`,
                    buttons: [...getNamesFromArray(player.playerPoint.locations), "Leave Road", "Attack Zombies"],
                    endEvent: false,
                    nextEvent: null,
                    effect: null
                })
            }
            return ({
                text: `You are on a road. ${pursuerWarning}You see ${player.playerPoint.NPCs.length} zombies here, ${npcsActive}
                of them are beginning to shamble towards you. What do you do next?`,
                buttons: [...getNamesFromArray(player.playerPoint.locations), "Run Away", "Attack Zombies"],
                endEvent: false,
                nextEvent: null,
                effect: null
            })
        }
    }
}

export default eventLocationMovement