const events = [
    {
        /**
         * id: lowercase title of event
         * name: Human-read name of event
         * unique: Boolean to decide if event occurs repeatedly or not
         * play: Function(vars), what the event actually does. Runs repeatedly until returns "endEvent" as true.
         */
        id: "buttontest",
        name: "Button Test",
        unique: true,
        play: (vars) => {
            if (vars == null) {
                return ({
                    text: "Choose A or B",
                    buttons: ["Pick A", "Pick B"],
                    endEvent: false
                })
            } else {
                if (vars === 0) {
                    return ({
                        text: "You have chosen A",
                        buttons: null,
                        endEvent: true
                    })
                }
                if (vars === 1) {
                    return ({
                        text: "You have chosen B",
                        buttons: null,
                        endEvent: true
                    })
                }
            }
        }
    }
]

export default events