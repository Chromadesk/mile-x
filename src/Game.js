import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { ViewPanel } from './App'
import getEvents from './Events'

function GameArea(props) {
    //Get all of the props functions and set them as variables.
    let setMessages = props.setMessages
    let setCurrentEvent = props.setCurrentEvent
    let getCurrentEvent = props.getCurrentEvent
    let events = getEvents()


    let displayedMessages = props.messages.map((message, i) => {
        return (
            <div key={i} className="message">
                {message}
            </div>
        )
    })
    console.log(displayedMessages)

    /**
     * Takes in an event and continually runs itself to process an event until the event is over.
     * @param {Object} event An event to be played
     * @param {Array} vars Not required. The variables of the event.
     */
    function handleEvent(event, vars) {
        //Set the current event in the state to the parameter event.
        setCurrentEvent(event)

        //Disable all pre-existing buttons
        let oldButtons = document.getElementsByClassName("button")
        for (let oldButton of oldButtons) {
            oldButton.className = "disabled button btn btn-outline-primary"
        }

        //Use the event's .play function and format the returned object.
        let playResult = event.play(vars)
        let buttons;

        if (playResult.buttons !== null) {
            let buttonContent = playResult.buttons.map((text, i) => {
                return (
                    <Button className='button' variant="outline-primary" key={i} onClick={() => { handleEvent(event, i) }}>{text}</Button>
                )
            }
            )
            buttons = (<ButtonGroup>{buttonContent}</ButtonGroup>)
        }
        console.log(playResult.text)
        setMessages(
            <div>
                <p>{playResult.text}</p>
                <div>{buttons}</div>
            </div>
        )

        //Report back to the event queue manager
        if (playResult.endEvent) {
            console.log("end event")
            setCurrentEvent(null)
            manageEventQueue(event.id)
        }
    }

    /**
     * Runs every function required to start and continue the game.
     */
    function runGame() {
        manageEventQueue(-1)
    }

    /**
     * Takes in the ID of the previous event played and selects the next event to be handled.
     * Currently only works in sequential order, must be changed later to account for random
     * events.
     * @param {number} id The ID of the previous event played.
     */
    function manageEventQueue(id) {
        id++
        if (id <= events.length) {
            for (let event of events) {
                if (event.id === id) {
                    handleEvent(event)
                }
            }
        } else {
            console.log(`No more events.`)
        }
    }

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