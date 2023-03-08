import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { ViewPanel } from './App'
import { getEventByName, initializeEvents } from './Events'
import { generateMap } from './mapcontrol'
import gameContextObject from './gamecontrol'

function GameArea(props) {
    //Get all of the props functions and set them as variables.
    let setMessages = props.setMessages
    let setCurrentEvent = props.setCurrentEvent
    let getCurrentEvent = props.getCurrentEvent
    let events = initializeEvents()

    /**
     * Sets the current event and marks event as active or inactive.
     * @param {Object} event An event object
     * @param {Object} playResult The result of using .play on the event.
     */
    function registerEventActivity(event, playResult) {
        event.active = true
        if (playResult.endEvent) { event.active = false }

        setCurrentEvent(event, playResult)
        if (playResult.effect !== null) {
            playResult.effect()
        }
    }

    /**
     * If event has buttons, creates a ButtonGroup JSX element with all buttons.
     * @param {Object} event An event object
     * @param {Object} playResult The result of using .play on the event.
     * @returns A JSX element of a ButtonGroup
     */
    function createButtonGroup(event, playResult) {
        let buttonContent = playResult.buttons.map((text, i) => {
            return (
                <Button className='button' variant="outline-primary" key={i} onClick={() => { handleEvent(event, i) }}>{text}</Button>
            )
        }
        )
        return (<ButtonGroup>{buttonContent}</ButtonGroup>)
    }

    /**
     * Switches to next event when events are chained together.
     * @param {Object} playResult The result of using .play on the event.
     */
    function playNextEvent(playResult) {
        if (playResult.nextEvent !== null) {
            console.log("Switching to event " + playResult.nextEvent.name)
            handleEvent(playResult.nextEvent)
        }
    }

    /**
     * Takes in an event and continually runs itself to process an event until the event is over.
     * @param {Object} event An event to be played
     * @param {Array} vars Not required. The variables of the event.
     */
    function handleEvent(event, vars) {
        //Use the event's .play function and format the returned object.
        let playResult = event.play(gameContextObject, vars)
        let buttons;

        registerEventActivity(event, playResult)

        if (playResult.buttons !== null) {
            buttons = createButtonGroup(event, playResult)
        }

        setMessages(
            <div>
                <p>{playResult.text}</p>
                <div>{buttons}</div>
            </div>
        )

        playNextEvent(playResult)
    }

    /**
     * Runs every function required to start and continue the game.
     */
    function runGame() {
        console.log(generateMap(100))
        handleEvent(events[0])
    }

    /**
     * TODO - Must be remade to make events play differently, using eventLocationMovement as
     * the default event but having a chance to randomly play an event, or contextually play an event,
     * interrupting the event chain.
     * 
     * Plays the next event according to the sequence of the events array.
     * @param {Object} event The previous event played.
     */
    function manageEventQueue(event) {
        if (event !== undefined && event !== null) {
            if (event.active === false) {
                let nextId = event.id + 1
                if (nextId <= events.length) {
                    for (let event of events) {
                        if (event.id === nextId) {
                            handleEvent(event)
                        }
                    }
                } else {
                    console.log(`No more events.`)
                }
            }
        }
    }

    let displayedMessages = props.messages.map((message, i) => {
        return (
            <div key={i} className="message">
                {message}
            </div>
        )
    })
    manageEventQueue(getCurrentEvent())

    return (
        <Col style={{ padding: '0px' }}>
            <Container>
                <Row id="maingame" className='mainpanel'>
                    <Col>
                        <div className='message'>
                            <Button className='button' variant="outline-primary" onClick={() => { runGame() }}>Begin</Button>
                        </div>
                        {displayedMessages}
                    </Col>
                </Row>
                <ViewPanel />
            </Container>
        </Col>
    )
}

export default GameArea;