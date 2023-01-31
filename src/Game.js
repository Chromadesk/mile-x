import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { ViewPanel } from './App'
import events from './Events'

function GameArea(props) {
    /*messageLog contains all the messages to the game area.
    Simply push new messages into it and they will be displayed.*/
    let overwriteMessages = props.overwriteMessages

    let displayedMessages = props.messages.map((message, i) => {
        return (
            <div key={i} className="message">
                {message}
            </div>
        )
    })

    function eventHandler(event, vars) {
        //Disable all pre-existing buttons
        let oldButtons = document.getElementsByClassName("button")
        console.log(oldButtons)
        for (let oldButton of oldButtons) {
            console.log(oldButton)
            oldButton.className = "disabled button btn btn-outline-primary"
        }

        let endEvent = false;
        let result = event.play(vars)

        if (result.endEvent) endEvent = true;
        if (result.buttons !== null) {
            let buttonContent = result.buttons.map((text, i) => {
                return (
                    <Button className='button' variant="outline-primary" key={i} onClick={() => { eventHandler(event, i) }}>{text}</Button>
                )
            }
            )
            overwriteMessages(
                <div>
                    <p>{result.text}</p>
                    <ButtonGroup>
                        {buttonContent}
                    </ButtonGroup>
                </div>
            )
        } else {
            overwriteMessages(
                <div>
                    <p>{result.text}</p>
                </div>
            )
        }
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