import React, { Component } from 'react';
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
import CustomNavBar from '../../components/NavBar';
import { c17, f22, kc135 } from "../../utils/planeInfo";

class Copy extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
  }
  

  onShowMore(id, e) {
    const list = [...this.state.planeList];
    
    const current = {...list.find(plane => plane.id === id)};
    current.isOpen = !current.isOpen;

    const index = list.findIndex(plane => plane.id === id);
    list[index] = current;

    this.setState({ planeList: list });
  }

  onAddHangar(e) {
    console.log(e);
  }

  onAddAirplane(e){ 
    //get the plane type
    const type = e.target.id;

    let newPlane;

    if (type === "c17") {
      newPlane = c17(this.state.planeList.c17.length + 1)
    }

    if (type === "kc135") {
      newPlane = kc135(this.state.planeList.kc135.length + 1)
    }

    if (type === "f22") {
      newPlane = f22(this.state.planeList.f22.length + 1)
    }
    
    console.log(newPlane);
  }

  onAddObstructions(e) {
    const nodes = [...this.state.nodes];
    const current = [...this.state.obstacleList];

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
      obstacleList: current.concat(newObstacle),
    });
  }

  render() {
    return (
      <div>
        <CustomNavBar/>
        <h2 className="container">Add Entities</h2>
        <Form className="container">
          <FormGroup>
            <Label>
              <span className="form-title">Hangars</span>
              <Button size="sm" onClick={e => this.onAddHangar(e)}>Add</Button>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>
              <span className="form-title">Airplanes</span>
              <ButtonDropdown direction="right" isOpen={this.state.addPlanesIsOpen} toggle={() => this.setState({ addPlanesIsOpen: !this.state.addPlanesIsOpen })}>
                <DropdownToggle caret size="sm">Add</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem id="c17" size="sm" onClick={e => this.onAddAirplane(e)}>Add C-17</DropdownItem>
                  <DropdownItem id="kc135" size="sm" onClick={e => this.onAddAirplane(e)}>Add KC-135</DropdownItem>
                  <DropdownItem id="f22" size="sm" onClick={e => this.onAddAirplane(e)}>Add F-22</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Label>
            {this.state.planes.map((plane) => {
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
    );
  }
}

export default Copy;