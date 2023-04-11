import { getNamesFromArray } from "../Events"
import eventDirectionalMovement from "./eventDirectionalMovement"
import eventSubLocationMovement from "./eventSubLocationMovement"

const eventLocationMovement = {
    name: "eventLocationMovement",
    unique: false,
    play: (context, vars) => {
        if (vars === context.pointSize) {
            return ({
                text: "You choose to continue moving.",
                buttons: null,
                endEvent: true,
                nextEvent: eventDirectionalMovement,
                effect: null
            })
        }
        if (vars >= 0) {
            return ({
                text: `You enter the ${context.playerPoint.locations[vars].name}.`,
                buttons: null,
                endEvent: true,
                nextEvent: eventSubLocationMovement,
                effect: () => {
                    context.playerLocal = context.playerPoint.locations[vars]
                    console.log(context.playerLocal)
                }
            })
        }
        return ({
            text: `You are on a road. There are ${context.playerPoint.NPCs.length} zombies here. Where do you go next?`,
            buttons: [...getNamesFromArray(context.playerPoint.locations), "Leave Road"],
            endEvent: false,
            nextEvent: null,
            effect: null
        })
    }
}

export default eventLocationMovement