import eventDirectionalMovement from "./events/eventDirectionalMovement"
import eventLocationMovement from "./events/eventLocationMovement"
import eventSubLocationMovement from "./events/eventSubLocationMovement"

const events = [
    eventLocationMovement,
    eventDirectionalMovement,
    eventSubLocationMovement
]

let eventsInitialized = false;

/**
 * Creates an copy of all of all events, ready for usage.
 * @returns All events, with added ids and active statuses.
 */
export function initializeEvents() {
    if (eventsInitialized) console.log("ERROR - initializeEvents() can only be used once.")
    return events.map((event, i) => {
        event.id = i
        event.active = false
        eventsInitialized = true
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

/**
 * 
 * @param {array} array An array of objects with a .name property.
 * @returns An array of string names.
 */
export function getNamesFromArray(array) {
    let names = [];
    for (let item of array) {
        names.push(item.name)
    }
    return names
}

export default initializeEvents