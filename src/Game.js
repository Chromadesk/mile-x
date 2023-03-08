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
     * Takes in an event and continually runs itself to process an event until the event is over.
     * @param {Object} event An event to be played
     * @param {Array} vars Not required. The variables of the event.
     */
    function handleEvent(event, vars) {
        //Disable all pre-existing buttons (non functional)
        // let oldButtons = document.getElementsByClassName("button")
        // for (let oldButton of oldButtons) {
        //     oldButton.className = "disabled button btn btn-outline-primary"
        // }

        //Use the event's .play function and format the returned object.
        let playResult = event.play(gameContextObject, vars)
        let buttons;

        event.active = true
        if (playResult.endEvent) { event.active = false }

        //Set the current event in the state to the parameter event.
        setCurrentEvent(event)
        if (playResult.effect !== null) {
            playResult.effect()
        }

        if (playResult.buttons !== null) {
            let buttonContent = playResult.buttons.map((text, i) => {
                return (
                    <Button className='button' variant="outline-primary" key={i} onClick={() => { handleEvent(event, i) }}>{text}</Button>
                )
            }
            )
            buttons = (<ButtonGroup>{buttonContent}</ButtonGroup>)
        }
        setMessages(
            <div>
                <p>{playResult.text}</p>
                <div>{buttons}</div>
            </div>
        )
        if (playResult.nextEvent !== null) {
            console.log("Switching to event " + playResult.nextEvent.name)
            return handleEvent(playResult.nextEvent)
        }
    }

    /**
     * Runs every function required to start and continue the game.
     */
    function runGame() {
        console.log(generateMap(100))
        handleEvent(events[0])
    }

    /**
     * Takes in an event. If the event's active parameter is false, automatically starts the
     * next event with handleEvent(). If there are no other events, or the current event is
     * marked as active, does nothing.
     * @param {object} event The ID of the previous event played.
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