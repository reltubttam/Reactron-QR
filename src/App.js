import React, { Component } from 'react';
import './App.css';
import Writer from "./Writer.jsx";
import Reader from "./Reader.jsx";
import {
  PanelGroup, 
  Panel,
} from "react-bootstrap";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: 'writer'
    };
  }

  handleSelect(activeKey) {
    console.log(activeKey)
    this.setState({ activeKey });
  }

  render() {
    return (
      <div 
        className="App"
        style={{ 
          width: "90%",
          margin: "auto",
          marginTop: 20
        }}
      >
        <PanelGroup
          accordion
          id="accordion-controlled-example"
          activeKey={this.state.activeKey}
          onSelect={this.handleSelect}
        >
          <Panel eventKey="writer">
            <Panel.Heading>
              <Panel.Title toggle>
                <h1>Create a code</h1>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <Writer/>
            </Panel.Body>
          </Panel>
          <Panel eventKey="reader">
            <Panel.Heading>
              <Panel.Title toggle>
                <h1>Scan a code</h1>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <Reader/>
            </Panel.Body>
              
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}

export default App;
