import { getNamesFromArray } from "../Events"

const eventLocationMovement = {
    name: "locationMovement",
    unique: false,
    play: (context, vars) => {
        if (vars === context.roadSize) {
            return ({
                text: "You choose to continue moving.",
                buttons: null,
                endEvent: true,
                nextEvent: "directionalMovement",
                effect: null
            })
        }
        if (vars >= 0) {
            return ({
                text: `You enter the ${context.playerPoint[vars].name}.`,
                buttons: null,
                endEvent: true,
                nextEvent: "subLocationMovement",
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