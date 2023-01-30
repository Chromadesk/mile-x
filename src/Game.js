import { Container, Row, Col } from 'react-bootstrap'
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
        let endEvent = false;
        let result = event.play(vars)

        if (result.endEvent) endEvent = true;
        if (result.buttons !== null) {
            let buttonContent = result.buttons.map((text, i) => {
                return (
                    <button key={i} onClick={() => { eventHandler(event, i) }}>{text}</button>
                )
            }
            )
            overwriteMessages(
                <div>
                    <p>{result.text}</p>
                    <div>
                        {buttonContent}
                    </div>
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
                            <button onClick={() => { eventHandler(events[0]) }}>Begin</button>
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