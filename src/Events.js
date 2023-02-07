const events = [
    {
        /**
         * id: Not to be included, will be automatically set.
         * name: Human-read name of event
         * unique: Boolean to decide if event occurs repeatedly or not
         * play: Function(vars), what the event actually does. Runs repeatedly until returns "endEvent" as true.
         */
        name: "locationmovement",
        unique: false,
        play: (context, vars) => {
            switch (vars) {
                default:
                    return ({
                        text: "You are currently on a road with the following locations. Where do you want to go?",
                        buttons: ["North", "South", "East", "West", ...context.playerLocal],
                        endEvent: false,
                        effect: null
                    })
                case 0:
                    return ({
                        text: "You move North.",
                        buttons: null,
                        endEvent: true,
                        effect: () => {
                            context.playerPos.y
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