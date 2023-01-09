import './App.css';
import { Container, Row, Col } from 'react-bootstrap'
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {

    return (
      <div>
        <Container fluid className='page'>
          <Row>
            <Col id="playerpanel" className='panel' md="2">
              <h2>Player Name</h2>
              <h5 style={{ color: 'gray' }}>Survivor</h5>
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
            <Col>
              <Container>
                <Row id="maingame" className='mainpanel'>
                  maingame
                </Row>
                <Row id="viewpanel" className='viewpanel'>
                  viewpanel
                </Row>
              </Container>
            </Col>
            <Col id="infopanel" className='panel' md="2">
              infopanel
            </Col>
          </Row>
        </Container>
      </div >
    )
  }
}

export default App;
