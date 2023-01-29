import { Container, Row, Col } from 'react-bootstrap'
import { ViewPanel } from './App'
import events from './Events'

function GameArea(props) {
    /*messageLog contains all the messages to the game area.
    Simply push new messages into it and they will be displayed.*/
    const messageLog = props.messages
    const overwriteMessages = props.overwriteMessages

    function eventHandler(event, vars) {
        let endEvent = false;
        let result = event.play(vars)
        console.log(result)

        if (result.endEvent) endEvent = true;
        console.log(result.buttons)
        if (result.buttons !== null) {
            let buttonContent = result.buttons.map((text, i) => {
                return (
                    <button key={i} onClick={() => { eventHandler(event, i) }}>{text}</button>
                )
            }
            )
            return (
                <div>
                    <p>{result.text}</p>
                    <div>
                        {buttonContent}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <p>{result.text}</p>
                </div>
            )
        }
    }

    componentDidMount() {
        eventHandler(events[0])
    }

    const displayedMessages = messageLog.map((message, i) => {
        return (
            <div key={i}>
                {message}
            </div>
        )
    })

    return (
        <Col style={{ padding: '0px' }}>
            <Container>
                <Row id="maingame" className='mainpanel'>
                    <Col>
                        {displayedMessages}
                    </Col>
                </Row>
                <ViewPanel />
            </Container>
        </Col>
    )
}

export default GameArea;