import { movePlayerToPoint } from "../mapcontrol"
import eventLocationMovement from "./eventLocationMovement"

const eventDirectionalMovement = {
    name: "eventDirectionalMovement",
    unique: false,
    play: (context, vars) => {
        const player = context.player
        switch (vars) {
            default:
                //First Run
                return ({
                    text: "Which direction do you want to head?",
                    buttons: ["North", "South", "East", "West"],
                    endEvent: false,
                    nextEvent: null,
                    effect: null
                })
            //Second Run
            case 0:
                return ({
                    text: "You move North.",
                    buttons: null,
                    endEvent: true,
                    nextEvent: eventLocationMovement,
                    effect: () => {
                        movePlayerToPoint(player.playerCords[0], player.playerCords[1] + 1)
                    }
                })
            case 1:
                return ({
                    text: "You move South.",
                    buttons: null,
                    endEvent: true,
                    nextEvent: eventLocationMovement,
                    effect: () => {
                        movePlayerToPoint(player.playerCords[0], player.playerCords[1] - 1)
                    }
                })
            case 2:
                return ({
                    text: "You move East.",
                    buttons: null,
                    endEvent: true,
                    nextEvent: eventLocationMovement,
                    effect: () => {
                        movePlayerToPoint(player.playerCords[0] + 1, player.playerCords[1])
                    }
                })
            case 3:
                return ({
                    text: "You move West.",
                    buttons: null,
                    endEvent: true,
                    nextEvent: eventLocationMovement,
                    effect: () => {
                        movePlayerToPoint(player.playerCords[0] - 1, player.playerCords[1])
                    }
                })
        }
    }
}

export default eventDirectionalMovement