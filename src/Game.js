import { Container, Row, Col } from 'react-bootstrap'
import { ViewPanel } from './App'

function GameArea(props) {
    /*messageLog contains all the messages to the game area.
    Simply push new messages into it and they will be displayed.*/
    const messageLog = props.messages
    messageLog.length = 0

    const displayedMessages = messageLog.map((message) => {
        return (
            <p className='message'>
                {message}
            </p>
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