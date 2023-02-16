import { movePlayerToLocation } from "./mapcontrol"

/**
 * id: Not to be included, will be automatically set.
 * name: Human-read name of event
 * unique: Boolean to decide if event occurs repeatedly or not
 * play: Function(vars), what the event actually does. Runs repeatedly until returns "endEvent" as true.
 */
const events = [
    {
        name: "directionalmovement",
        unique: false,
        play: (context, vars) => {
            switch (vars) {
                default:
                    return ({
                        text: "Choose",
                        buttons: ["North", "South", "East", "West"],
                        endEvent: false,
                        effect: null
                    })
                case 0:
                    return ({
                        text: "You move North.",
                        buttons: null,
                        endEvent: true,
                        effect: () => {
                            movePlayerToLocation(context.playerPos[0], context.playerPos[1] + 1)
                        }
                    })
                case 1:
                    return ({
                        text: "You move South.",
                        buttons: null,
                        endEvent: true,
                        effect: () => {
                            movePlayerToLocation(context.playerPos[0], context.playerPos[1] - 1)
                        }
                    })
                case 2:
                    return ({
                        text: "You move East.",
                        buttons: null,
                        endEvent: true,
                        effect: () => {
                            movePlayerToLocation(context.playerPos[0] + 1, context.playerPos[1])
                        }
                    })
                case 3:
                    return ({
                        text: "You move West.",
                        buttons: null,
                        endEvent: true,
                        effect: () => {
                            movePlayerToLocation(context.playerPos[0] - 1, context.playerPos[1])
                        }
                    })
            }
        }
    },
]

function getEvents() {
    return events.map((event, i) => {
        event.id = i
        event.active = false
        return event
    })
}

export default getEvents