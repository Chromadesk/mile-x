const events = [
    {
        /**
         * id: Not to be included, will be automatically set.
         * name: Human-read name of event
         * unique: Boolean to decide if event occurs repeatedly or not
         * play: Function(vars), what the event actually does. Runs repeatedly until returns "endEvent" as true.
         */
        id: -1,
        name: "Button Test",
        unique: true,
        play: (vars) => {
            switch (vars) {
                default:
                    return ({
                        text: "Choose A or B",
                        buttons: ["Option A", "Option B"],
                        endEvent: false
                    })
                case 0:
                    return ({
                        text: "You have chosen A",
                        buttons: null,
                        endEvent: true
                    })
                case 1:
                    return ({
                        text: "You have chosen B",
                        buttons: null,
                        endEvent: true
                    })
            }
        }
    },
    {
        id: -1,
        name: "Button Test 2",
        unique: true,
        play: (vars) => {
            switch (vars) {
                default:
                    return ({
                        text: "Confirm that you see this prompt.",
                        buttons: ["I see it", "I cannot see the prompt", "No"],
                        endEvent: false
                    })
                case 0:
                    return ({
                        text: "Great",
                        buttons: null,
                        endEvent: true
                    })
                case 1:
                    return ({
                        text: "skill issue",
                        buttons: null,
                        endEvent: true
                    })
                case 2:
                    return ({
                        text: "Ok",
                        buttons: null,
                        endEvent: true
                    })
            }
        }
    },
]

function getEvents() {
    return events.map((event, i) => {
        event.id = i
        return event
    })
}

export default getEvents