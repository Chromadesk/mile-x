import { getNamesFromArray } from "../Events"

const eventSubLocationMovement = {
    name: "subLocationMovement",
    unique: false,
    play: (context, vars) => {
        if (vars === context.playerLocal.subLocations.length) {
            return ({
                text: "You go outside.",
                buttons: null,
                endEvent: true,
                nextEvent: "locationMovement",
                effect: null
            })
        }
        if (vars >= 0) {
            return ({
                text: "",
                buttons: null,
                endEvent: true,
                nextEvent: "subLocationInteraction",
                effect: () => {
                    context.playerSubLocal = context.playerLocal.subLocations[vars]
                    console.log(context.playerSubLocal)
                }
            })
        }
        return ({
            text: "Where to go?",
            buttons: [...getNamesFromArray(context.playerLocal.subLocations), `Leave ${context.playerLocal.name}`],
            endEvent: false,
            nextEvent: null,
            effect: null
        })
    }
}

export default eventSubLocationMovement