import './App.css';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Game from './Game';

function PlayerPanel() {
  return (
    <Col id="playerpanel" className='panel' md="2">
      <h2>Player Name</h2>
      <h5 style={{ color: 'gray' }}>Survivor</h5>
      <br></br>
      <Container>
        <Row><Col>Time</Col><Col style={{ textAlign: 'right' }}>0:00 PM</Col></Row>
        <Row><Col>Weather</Col><Col style={{ textAlign: 'right' }}>Sunny</Col></Row>
        <Row><Col>Miles Left</Col><Col style={{ textAlign: 'right' }}>100mi</Col></Row>
        <Row><Col>Location</Col><Col style={{ textAlign: 'right' }}>Road</Col></Row>
      </Container>
      <br></br>
      <h5>Stats</h5>
      <Container>
        <Row><Col>Health:</Col><Col style={{ textAlign: 'right' }}>100</Col></Row>
        <Row><Col>Energy:</Col><Col style={{ textAlign: 'right' }}>100</Col></Row>
        <Row><Col>Hunger:</Col><Col style={{ textAlign: 'right' }}>100</Col></Row>
        <Row><Col>Thirst:</Col><Col style={{ textAlign: 'right' }}>100</Col></Row>
      </Container>
      <br></br>
      <h5>Effects</h5>
      <Container>
        <Row style={{ color: 'gray' }}><Col>Status Effect</Col><Col style={{ textAlign: 'right' }}>Level</Col></Row>
        <Row><Col>-</Col><Col style={{ textAlign: 'right' }}>0</Col></Row>
      </Container>
    </Col>
  )
}

function ViewPanel() {
  return (
    <Row id="viewpanel" className='viewpanel'>
      <Container>
        <Tabs defaultActiveKey="profile">
          <Tab eventKey="profile" title="Profile">
            <p>i just farteddd</p>
          </Tab>
          <Tab eventKey="inventory" title="Inventory">
            <PlayerInventory />
          </Tab>
        </Tabs>
      </Container>
    </Row>
  )
}

function GameArea(props) {
  const gameMessages = props.messages.map((message) => {
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
            {gameMessages}
          </Col>
        </Row>
        <ViewPanel />
      </Container>
    </Col>
  )
}

function PlayerInventory() {
  return (
    <div>
      <Row style={{ color: 'gray', textAlign: 'center' }}>
        <Col>ITEMS: 0</Col>
        <Col>WEIGHT: 0/40</Col>
        <Col>CAPACITY: 0/20</Col>
      </Row>
      <div style={{ color: 'white' }}>
        <Row>
          <Col>Image</Col>
          <Col md="4">Name</Col>
          <Col>Type</Col>
          <Col>Weight</Col>
          <Col>Size</Col>
        </Row>
        <Row>
          <Col>no image</Col>
          <Col md="4">Catch the Rainbow</Col>
          <Col>CD</Col>
          <Col>0.1</Col>
          <Col>1</Col>
        </Row>
        <Row>
          <Col>no image</Col>
          <Col md="4">Catch the Rainbow</Col>
          <Col>CD</Col>
          <Col>0.1</Col>
          <Col>1</Col>
        </Row>
      </div>
    </div>
  )
}

function InfoPanel() {
  return (
    <Col id="infopanel" className='panel' md="2">
      infopanel
    </Col>
  )
}

class App extends Component {
  state = {
    messages: [
      "Hello",
    ]
  }

  printToGame = (message) => {
    const { messages } = this.state
    this.setState({
      messages: message
    })
  }

  render() {
    const { messages } = this.state

    return (
      <div>
        <Container fluid className='page'>
          <Row>
            <PlayerPanel />
            <GameArea messages={messages} />
            <InfoPanel />
          </Row>
        </Container>
        <Game print={this.printToGame} />
      </div>
    )
  }
}

export default App;
