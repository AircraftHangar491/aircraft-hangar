import React, { Component } from "react";
import "./Hangar.css";
import RGL, { WidthProvider } from "react-grid-layout";
import {
  Button,
  Collapse,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import {
  Diagram,
  DiagramComponent,
  Inject,
  NodeModel,
  BpmnShape,
  BpmnSubProcessModel,
  BpmnDiagrams,
  BpmnActivityModel,
  BpmnFlowModel,
  NodeConstraints
} from "@syncfusion/ej2-react-diagrams";

const ResponsiveGridLayout = WidthProvider(RGL);

// A node is created and stored in nodes array.
let node = [
  {
    // Position of the node
    offsetX: 250,
    offsetY: 250,
    // Constraints can be changed to Rotate or Resize or Drag or Select, etc (https://ej2.syncfusion.com/react/documentation/api/diagram/nodeConstraints/)
    constraints: NodeConstraints.Default & ~NodeConstraints.Rotate,
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
    height: 100,
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

  constructor(props) {
    super(props);

    this.state = {
      // node information
      hangars: [],
      planes: [],
      obstacles: [],
      // form information
      hangarList: [],
      planeList: [],
      obstacleList: [],
      // form buttons,
      hangarIsOpen: false,
      planeIsOpen: false,
      obstaclesIsOpen: false,
    }

    this.onAddAirplane = this.onAddAirplane.bind(this);
    this.onShowMore = this.onShowMore.bind(this);
  }

  onShowMore(id, e) {
    const list = [...this.state.planeList];
    
    const current = {...list.find(plane => plane.id === id)};
    current.isOpen = !current.isOpen;

    const index = list.findIndex(plane => plane.id === id);
    list[index] = current;

    this.setState({ planeList: list });
  }

  onAddHangar() {
    this.setState(state => {
      return state.hangars.concat()
    });
  }

  onAddAirplane(e) {
    console.log(e);
    const current = this.state.planeList;

    this.setState({
      planes: current.concat(
        {
          id: `Airplane ${current.length + 1}`,
          isOpen: false,
          // Position of the node
          offsetX: 100,
          offsetY: 100,
          // Size of the node
          width: 100,
          height: 100,
          //Sets type as Bpmn and shape as Event
          shape: {
            type: 'Bpmn',
            shape: 'Gateway',
            // set the event type as End
            event: {
              event: 'End'
            }
          },
        }
      ),
      planeList: current.concat(
        {
          id: `Airplane ${current.length + 1}`,
          isOpen: false,
          // Position of the node
          offsetX: 100,
          offsetY: 100,
          // Size of the node
          width: 100,
          height: 100,
          //Sets type as Bpmn and shape as Event
          shape: {
            type: 'Bpmn',
            shape: 'Gateway',
            // set the event type as End
            event: {
              event: 'End'
            }
          },
        }
      ),
    });
  }

  render() {

    console.log(this.state.planeList)
    return (
      <div className="container hangar">
        <div className="row">
          <div className="col-sm">
            <h1>space for form</h1>
            <Form>
              <FormGroup>
                <Label>
                  <span className="form-title">Hangars</span>
                  <Button size="sm">Add</Button>
                </Label>
                
              </FormGroup>
              <FormGroup>
                <Label>
                  <span className="form-title">Airplanes</span>
                  <Button size="sm" onClick={(e) => this.onAddAirplane(e)}>Add</Button>
                  {this.state.planeList.map((plane) => {
                    return (
                      <div key={plane.id}>
                        <Button id={plane.id} onClick={e => this.onShowMore(plane.id, e)}>{plane.id}</Button>
                        <Collapse isOpen={plane.isOpen}>
                          <Input
                            type="name"
                            name="id"
                            id="id"
                            placeholder={plane.id}
                          />
                          <Input
                            type="number"
                            name="positionX"
                            id="positionX"
                            placeholder={plane.offsetX}
                          />
                          <Input
                            type="number"
                            name="positionY"
                            id="positionY"
                            placeholder={plane.offsetY}
                          />
                          <Input
                            type="number"
                            name="width"
                            id="width"
                            placeholder={plane.width}
                          />
                          <Input
                            type="number"
                            name="height"
                            id="height"
                            placeholder={plane.height}
                          />
                        </Collapse>
                      </div>
                    );
                  })}
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <span className="form-title">Obstructions</span>
                  <Button size="sm">Add</Button>
                </Label>
              </FormGroup>
            </Form>
          </div>
          <div className="col-sm layout">
            <DiagramComponent
              id="diagram"
              width = {
                '100%'
              }
              height = {
                '700px'
              }
              // Add node
              nodes = {
                this.state.planes
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