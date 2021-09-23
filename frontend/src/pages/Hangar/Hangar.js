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
    this.onPositionChange = this.onPositionChange.bind(this);
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
    const current = this.state.planeList;

    const x = Math.floor(Math.random() * 101);
    const y = Math.floor(Math.random() * 101);

    const newPlane = {
      id: `Airplane ${current.length + 1}`,
      isOpen: false,
      // set the node's position to be based on the center
      pivot: {
        x: 0.5,
        y: 0.5,
      },
      // Position of the node
      offsetX: x,
      offsetY: y,
      // Size of the node
      width: 100,
      height: 100,
      style: {
        fill: '#6BA5D7',
        strokeColor: 'white'
    },
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

    this.setState({
      planes: current.concat(newPlane),
      planeList: current.concat(newPlane),
    });
  }

  getCorners(plane) {

    const planeWidth = plane.width;
    const planeHeight = plane.height;

    const planeX = plane.offsetX;
    const planeY = plane.offsetY;

    // get the four corners
    const top = {
      x: planeX,
      y: (planeY - (planeHeight / 2))
    };

    const bottom = {
      x: planeX,
      y: (planeY + (planeHeight / 2))
    };

    const left = {
      x: (planeX - (planeWidth / 2)),
      y: planeY
    };

    const right = {
      x: (planeX + (planeWidth / 2)),
      y: planeY
    };

    return { top, bottom, left, right }
  }

  checkOverlap(changedPlane) {
    const currentPlanes = [...this.state.planes];

    // get height and width
    const changedPlaneHeight = changedPlane.height;
    const changedPlaneWidth = changedPlane.width;

    // get x and y
    const changedPlaneX = changedPlane.offsetX;
    const changedPlaneY = changedPlane.offsetY;

    // get corners
    const changedPlaneCorners = this.getCorners(changedPlane);

    //console.log('changed');
    //console.log(changedPlaneCorners);

    for (const index in currentPlanes) {
      // skip if current[index] is the same as the plane we just moved
      if (currentPlanes[index].id === changedPlane.id) {
        continue;
      }

      // get offset x and y
      // get width and height

      // from offset x and y, find the points in the grid that the changed plane is occupying
      // check if current[index] is on there

      const planeCorners = this.getCorners(currentPlanes[index]);

      //console.log("planes")
      //console.log(planeCorners);
      // check if top corner is touching
      if (
        (changedPlaneCorners.top.y < planeCorners.bottom.y) &&
        (changedPlaneCorners.top.y > planeCorners.top.y) &&
        (changedPlaneCorners.top.x < planeCorners.right.x) &&
        (changedPlaneCorners.top.x > planeCorners.left.x)) {
        console.log("TOUCHING!!");
      }

      // check if bottom corner is touching

      // check if left corner is touching

      // check if right corner is touching
    }
  }

  onPositionChange(e) {
    if (e.state === 'Completed') {
      // update the plane position x and y
      const current = [...this.state.planes];
      const plane = current.find( ({ id }) => {
        const propName = e.source.propName;

        if (propName === 'nodes') {
          return id === e.source.properties.id;
        }

        if (propName === 'selectedItems') {
          const nodes = e.source.properties.nodes;
          if (nodes.length > 1) {
            return undefined;
          }
          return id === nodes[0].properties.id;
        }

        return undefined;
      });

      plane.offsetX = e.newValue.offsetX;
      plane.offsetY = e.newValue.offsetY;

      const index = current.findIndex(e => e.id === plane.id);
      current[index] = plane;
      this.setState({ planes: current });

      // check for any overlap
      this.checkOverlap(plane);
    }
  }
  

  render() {

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
                </Label>
                {this.state.planeList.map((plane) => {
                    return (
                      <div key={plane.id}>
                        <Button id={plane.id} onClick={e => this.onShowMore(plane.id, e)}>{plane.id}</Button>
                        <Collapse isOpen={plane.isOpen}>
                          <Label>Name</Label>
                          <Input
                            type="name"
                            name="id"
                            id="id"
                            placeholder={plane.id}
                          />
                          <Label>Position X</Label>
                          <Input
                            type="number"
                            name="positionX"
                            id="positionX"
                            placeholder={plane.offsetX}
                          />
                          <Label>Position Y</Label>
                          <Input
                            type="number"
                            name="positionY"
                            id="positionY"
                            placeholder={plane.offsetY}
                          />
                          <Label>Width</Label>
                          <Input
                            type="number"
                            name="width"
                            id="width"
                            placeholder={plane.width}
                          />
                          <Label>Height</Label>
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
              positionChange={e => this.onPositionChange(e)}
              enablePersistence="true"
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