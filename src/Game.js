import { Container, Row, Col } from 'react-bootstrap'
import ViewPanel from './App'

function GameArea(props) {
    const gameMessages = props.messages.map((message) => {
        return (
            <p className='message'>
                {message}
            </p>
        )
    })

    const print = props.print

    return (
        <Col style={{ padding: '0px' }}>
            <Container>
                <Row id="maingame" className='mainpanel'>
                    <Col>
                        {gameMessages}
                    </Col>
                </Row>
                <ViewPanel />
            </Container>
        </Col>
    )
}

export default GameArea;