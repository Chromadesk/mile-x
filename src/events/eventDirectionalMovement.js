import { movePlayerToPoint } from "../mapcontrol"

const eventDirectionalMovement = {
    name: "directionalMovement",
    unique: false,
    play: (context, vars) => {
        switch (vars) {
            default:
                return ({
                    text: "Which direction do you want to head?",
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
}

export default eventDirectionalMovement