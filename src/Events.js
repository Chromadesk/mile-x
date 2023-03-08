import { movePlayerToPoint } from "./mapcontrol"
import eventDirectionalMovement from "./events/eventDirectionalMovement"
import eventLocationMovement from "./events/eventLocationMovement"
import eventSubLocationMovement from "./events/eventSubLocationMovement"

const events = [
    eventLocationMovement,
    eventDirectionalMovement,
    eventSubLocationMovement
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
    console.log('Event "' + name + '" not found.')
    return null
}

export function getNamesFromArray(array) {
    let names = [];
    for (let location of array) {
        names.push(location.name)
    }
    return names
}

export default getEvents