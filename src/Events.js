import { movePlayerToPoint } from "./mapcontrol"

/**
 * id: Not to be included, will be automatically set.
 * name: Human-read name of event
 * unique: Boolean to decide if event occurs repeatedly or not
 * play: Function(vars), what the event actually does. Runs repeatedly until returns "endEvent" as true.
 */
const events = [
    {
        //Read carefully, this does not use a switch case.
        name: "locationMovement",
        unique: false,
        play: (context, vars) => {
            if (vars === context.roadSize) {
                return ({
                    text: "",
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
                buttons: [...context.getPlayerPointNames(), "Leave Road"],
                endEvent: false,
                nextEvent: null,
                effect: null
            })
        }
    },
    {
        name: "directionalMovement",
        unique: false,
        play: (context, vars) => {
            switch (vars) {
                default:
                    return ({
                        text: "Choose",
                        buttons: ["North", "South", "East", "West"],
                        endEvent: false,
                        nextEvent: null,
                        effect: null
                    })
                case 0:
                    return ({
                        text: "You move North.",
                        buttons: null,
                        endEvent: true,
                        nextEvent: "locationMovement",
                        effect: () => {
                            movePlayerToPoint(context.playerPos[0], context.playerPos[1] + 1)
                        }
                    })
                case 1:
                    return ({
                        text: "You move South.",
                        buttons: null,
                        endEvent: true,
                        nextEvent: "locationMovement",
                        effect: () => {
                            movePlayerToPoint(context.playerPos[0], context.playerPos[1] - 1)
                        }
                    })
                case 2:
                    return ({
                        text: "You move East.",
                        buttons: null,
                        endEvent: true,
                        nextEvent: "locationMovement",
                        effect: () => {
                            movePlayerToPoint(context.playerPos[0] + 1, context.playerPos[1])
                        }
                    })
                case 3:
                    return ({
                        text: "You move West.",
                        buttons: null,
                        endEvent: true,
                        nextEvent: "locationMovement",
                        effect: () => {
                            movePlayerToPoint(context.playerPos[0] - 1, context.playerPos[1])
                        }
                    })
            }
        }
    },
]

/**
 * Creates an copy of all of all events, ready for usage.
 * @returns All events, with added ids and active statuses.
 */
export function getEvents() {
    return events.map((event, i) => {
        event.id = i
        event.active = false
        return event
    })
}

/**
 * Gets an event from the events array via searching for it by name.
 * @param {string} name The name of the event to get.
 * @returns an Event object, if found. If not found, Null.
 */
export function getEventByName(name) {
    for (let event of events) {
        if (event.name === name) {
            return event
        }
    }
    return null
}

export default getEvents