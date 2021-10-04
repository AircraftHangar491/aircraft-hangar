import React, { Component } from "react";
import "./Hangar.css";
import {
  Button,
  ButtonDropdown,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import {
  DiagramComponent,
  Inject,
  BpmnDiagrams,
} from "@syncfusion/ej2-react-diagrams";
import CustomNavBar from "../../components/NavBar";
import { getCorners, checkTopLeft, checkTopRight, checkBottomLeft, checkBottomRight } from "./Hangar.utils";

class Hangar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //list of both planes and obstacles
      nodes: [],
      // node information
      hangars: [],
      planes: [],
      obstacles: [],
      // organized plane list information
      planeList: {
        c17: [],
        kc135: [],
        f22: [],
      },
      // form buttons,
      addPlanesIsOpen: false,
      hangarIsOpen: false,
      planeIsOpen: false,
      obstaclesIsOpen: false,
    }

    this.onAddHangar = this.onAddHangar.bind(this);
    this.onAddAirplane = this.onAddAirplane.bind(this);
    this.onAddObstructions = this.onAddObstructions.bind(this);
    this.onShowMore = this.onShowMore.bind(this);
    this.onPositionChange = this.onPositionChange.bind(this);
  }

  onShowMore(id, e) {
    const list = [...this.state.planes];
    
    const current = {...list.find(plane => plane.id === id)};
    current.isOpen = !current.isOpen;

    const index = list.findIndex(plane => plane.id === id);
    list[index] = current;

    this.setState({ planes: list });
  }

  onAddHangar(e) {
    console.log(e);
  }

  onAddAirplane(e){ 
    const nodes = [...this.state.nodes];
    const current = [...this.state.planes];

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
      nodes: nodes.concat(newPlane),
      planes: current.concat(newPlane),
    });
  }

  onAddObstructions(e) {
    const nodes = [...this.state.nodes];
    const current = [...this.state.obstacles];

    const x = Math.floor(Math.random() * 101);
    const y = Math.floor(Math.random() * 101);

    const newObstacle = {
      id: `Obstacle ${current.length + 1}`,
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
      //Sets type as Bpmn and shape as Task
      shape: {
        type: 'Bpmn',
        shape: 'Task',
        // set the event type as End
        event: {
          event: 'End'
        }
      },
    }

    this.setState({
      nodes: nodes.concat(newObstacle),
      obstacles: current.concat(newObstacle),
    });
  }

  checkOverlap(changedPlane) {
    const currentPlanes = [...this.state.planes];

    // get corners
    const changedPlaneCorners = getCorners(changedPlane);

    for (const index in currentPlanes) {
      // skip if current[index] is the same as the plane we just moved
      if (currentPlanes[index].id === changedPlane.id) {
        continue;
      }

      // get offset x and y
      // get width and height

      // from offset x and y, find the points in the grid that the changed plane is occupying
      // check if current[index] is on there

      const planeCorners = getCorners(currentPlanes[index]);
        
      if (
        checkTopLeft(changedPlaneCorners, planeCorners) ||
        checkTopRight(changedPlaneCorners, planeCorners) ||
        checkBottomLeft(changedPlaneCorners, planeCorners) ||
        checkBottomRight(changedPlaneCorners, planeCorners)
      ) {
        console.log("Touching!");
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
      <div>
        <CustomNavBar/>
        <div className="container hangar">
          <div className="row">
            <div className="col-sm">
              <h1>space for form</h1>
              <Form>
                <FormGroup>
                  <Label>
                    <span className="form-title">Hangars</span>
                    <Button size="sm" onClick={e => this.onAddHangar(e)}>Add</Button>
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <span className="form-title">Airplanes</span>
                    <Button size="sm" onClick={(e) => this.onAddAirplane(e)}>Add</Button>
                  </Label>
                  {this.state.nodes.map((plane) => {
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
                    <Button size="sm" onClick={e => this.onAddObstructions(e)}>Add</Button>
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
      </div>
    );  
  }
}

export default Hangar;