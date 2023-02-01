import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { ViewPanel } from './App'
import events from './Events'

function GameArea(props) {
    /*messageLog contains all the messages to the game area.
    Simply push new messages into it and they will be displayed.*/
    let setMessages = props.setMessages
    let setCurrentEvent = props.setCurrentEvent


    let displayedMessages = props.messages.map((message, i) => {
        return (
            <div key={i} className="message">
                {message}
            </div>
        )
    })

    function eventHandler(event, vars) {
        //Set the current event in the state to the parameter event.
        setCurrentEvent(event)

        //Disable all pre-existing buttons
        let oldButtons = document.getElementsByClassName("button")
        console.log(oldButtons)
        for (let oldButton of oldButtons) {
            console.log(oldButton)
            oldButton.className = "disabled button btn btn-outline-primary"
        }

        //Use the event's .play function and format the returned object.
        let result = event.play(vars)

        if (result.buttons !== null) {
            let buttonContent = result.buttons.map((text, i) => {
                return (
                    <Button className='button' variant="outline-primary" key={i} onClick={() => { eventHandler(event, i) }}>{text}</Button>
                )
            }
            )
            setMessages(
                <div>
                    <p>{result.text}</p>
                    <ButtonGroup>
                        {buttonContent}
                    </ButtonGroup>
                </div>
            )
        } else {
            setMessages(
                <div>
                    <p>{result.text}</p>
                </div>
            )
        }
        if (result.endEvent) setCurrentEvent(null)
    }

    return (
        <Col style={{ padding: '0px' }}>
            <Container>
                <Row id="maingame" className='mainpanel'>
                    <Col>
                        <div className='message'>
                            <Button className='button' variant="outline-primary" onClick={() => { eventHandler(events[0]) }}>Begin</Button>
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