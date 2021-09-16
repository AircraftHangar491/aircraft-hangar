import React, { Component } from "react";
import "./Hangar.css";
import RGL, { WidthProvider } from "react-grid-layout";
import { Button, Form } from 'reactstrap';
import {
  Diagram,
  DiagramComponent,
  Inject,
  NodeModel,
  BpmnShape,
  BpmnSubProcessModel,
  BpmnDiagrams,
  BpmnActivityModel,
  BpmnFlowModel
} from "@syncfusion/ej2-react-diagrams";
import { bottom } from "../../utils";

const ResponsiveGridLayout = WidthProvider(RGL);

// A node is created and stored in nodes array.
let node = [
  {
    // Position of the node
    offsetX: 250,
    offsetY: 250,
    // Size of the node
    width: 100,
    height: 200,
    //Sets type as Bpmn and shape as Event
    shape: {
        type: 'Bpmn',
        shape: 'Gateway',
        // set the event type as End
        event: {
            event: 'End'
        }
    },
  },
  {
    // Position of the node
    offsetX: 100,
    offsetY: 100,
    // Size of the node
    width: 100,
    height: 200,
    //Sets type as Bpmn and shape as Event
    shape: {
      type: 'Bpmn',
      shape: 'DataObject',
      // set the event type as End
      event: {
        event: 'End'
      }
    },
  },
];

class Hangar extends Component {

  render() {

    return (
      <div className="container hangar">
        <div className="row">
          <div className="col-sm">
            <h1>space for form</h1>
          </div>
          <div className="col-sm layout">
            <DiagramComponent
              id="diagram"
              width = {
                '100%'
              }
              height = {
                '600px'
              }
              // Add node
              nodes = {
                node
              }
            >
              <Inject services = {[BpmnDiagrams]}/>
            </DiagramComponent>
          </div>
        </div>
      </div>
    );  
  }
}

export default Hangar;