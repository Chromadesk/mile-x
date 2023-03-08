import { getNamesFromArray } from "../Events"
import eventDirectionalMovement from "./eventDirectionalMovement"
import eventSubLocationMovement from "./eventSubLocationMovement"

const eventLocationMovement = {
    name: "eventLocationMovement",
    unique: false,
    play: (context, vars) => {
        if (vars === context.roadSize) {
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
                text: `You enter the ${context.playerPoint[vars].name}.`,
                buttons: null,
                endEvent: true,
                nextEvent: eventSubLocationMovement,
                effect: () => {
                    context.playerLocal = context.playerPoint[vars]
                    console.log(context.playerLocal)
                }
            })
        }
        return ({
            text: `You are on a road. Where do you go next?`,
            buttons: [...getNamesFromArray(context.playerPoint), "Leave Road"],
            endEvent: false,
            nextEvent: null,
            effect: null
        })
    }
}

export default eventLocationMovement