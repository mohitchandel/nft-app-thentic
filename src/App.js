import logo from "./logo.svg";
import "./App.css";
import TransferNft from "./Components/TransferNft";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import MintNft from "./Components/MintNft";

function App() {
  return (
    <div className="App">
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <Tabs
              defaultActiveKey="mint"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="mint" title="Mint">
                <MintNft />
              </Tab>
              <Tab eventKey="transfer" title="Transfer">
                <TransferNft />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
