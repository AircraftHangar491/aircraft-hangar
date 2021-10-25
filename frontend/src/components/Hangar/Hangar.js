import React, { useState } from "react";
import "./Hangar.css";
import {
  Button,
  Form,
  Label,
  Input,
  Popover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";
import {
  Nav,
} from "react-bootstrap";
import {
  DiagramComponent,
  DataBinding,
  Inject,
  BpmnDiagrams,
} from "@syncfusion/ej2-react-diagrams";
import {
  DataManager,
} from '@syncfusion/ej2-data';
import _ from 'lodash';
import { collisionCheck } from "./Hangar.utils";
import { hangarInfo, updateHangarInfo } from "../../utils/hangarInfo";
import swal from "sweetalert";

let diagramInstance;

const Hangar = (
  {
    hangars,
    setHangars,
    currentHangar,
    setCurrentHangar,
    hangarCount,
    setHangarCount,
    planes,
    setPlanes,
  }) => {

  const [addHangarsIsOpen, setAddHangarsIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [hangarLength, setHangarLength] = useState(0);
  const [hangarWidth, setHangarWidth] = useState(0);

  const [selectedPlane, setSelectedPlane] = useState();
  const [editHangarIsOpen, setEditHangarIsOpen] = useState(false);

  // ---------------------------- form functions -------------------------------------

  const onNicknameSet = (e) => {
    const { value } = e.target;
    setNickname(value);
  }

  const onDimensionSet = (e) => {
    const { value, id } = e.target;

    if (id === "hangarLength") {
      setHangarLength(value);
    }

    if (id === "hangarWidth") {
      setHangarWidth(value);
    }
  }

    // ---- Add hangar -----

  const onToggleAddHangars = (e) => {
    // toggle button true or false
    setAddHangarsIsOpen(!addHangarsIsOpen);
  }

  const onAddHangars = (e) => {
    // add hangar
    const newHangar = hangarInfo(nickname, hangarLength, hangarWidth, (hangarCount + 1));

    if (hangarCount === 0) {
      setCurrentHangar(newHangar.id);
    }

    setHangars({
      ...hangars,
      [newHangar.id]: newHangar
    });
    setHangarCount(hangarCount+1);


    // close form
    setAddHangarsIsOpen(!addHangarsIsOpen);

    // reset form states
    setNickname("");
    setHangarLength(0);
    setHangarWidth(0);
  }

  // ----- Edit Hangar -------

  const onToggleEditHangar = () => {
    setEditHangarIsOpen(!editHangarIsOpen);
  }

  const onEditHangar = () => {
    const hangarList = updateHangarInfo(currentHangar, nickname, hangarWidth, hangarLength);

    setHangars(hangarList);

    // close form
    setEditHangarIsOpen(!editHangarIsOpen);

    // reset form states
    setNickname("");
    setHangarLength(0);
    setHangarWidth(0);
  }

  const removePlane = () => {    
    if (!selectedPlane) return swal('Error', 'Choose a plane.', 'error');

    const hangarPlanes = [...hangars[currentHangar].planes];
    
    _.remove(hangarPlanes, (plane) => {
      return plane.id === selectedPlane;
    });

    setHangars({
      ...hangars,
      [currentHangar]: {
        ...hangars[currentHangar],
        planes: hangarPlanes
      }
    });

    const currentPlanes = { ...planes};

    currentPlanes.pending[selectedPlane] = currentPlanes.added[selectedPlane];
    
    delete planes.added[selectedPlane];

    setPlanes(currentPlanes);
  }

  const deletePlane = () => {
    if (!selectedPlane) return swal('Error', 'Choose a plane.', 'error');

    const hangarPlanes = [...hangars[currentHangar].planes];
    
    _.remove(hangarPlanes, (plane) => {
      return plane.id === selectedPlane;
    });

    setHangars({
      ...hangars,
      [currentHangar]: {
        ...hangars[currentHangar],
        planes: hangarPlanes
      }
    });
  }

  // ------------ hangar functions --------------------------------

  const onClickPlane = (e) => { 
    const { actualObject } = e;

    console.log(actualObject);
    if (actualObject) {
      return setSelectedPlane(actualObject.properties.id);
    }

    return setSelectedPlane(null);
  }

  const checkOverlap = (changedPlane) => {
    const currentPlanes = [...hangars[currentHangar].planes];

    for (const index in currentPlanes) {
      // skip if current[index] is the same as the plane we just moved
      if (currentPlanes[index].id === changedPlane.id) {
        continue;
      }
        
      // check smaller plane if the moved plane is a big plane
      if (changedPlane.type === "C-17") {
        if (collisionCheck(currentPlanes[index], changedPlane)) {
          console.log("Touching!");
        }
      } else {
        if (collisionCheck(changedPlane, currentPlanes[index])) {
          console.log("Touching!");
        }
      }
    }
  }

  const onPositionChange = (e) => {
    if (e.state === 'Completed') {
      // update the plane position x and y

      let changedPlaneId;

      const propName = e.source.propName;

      if (propName === 'nodes') {
        changedPlaneId = e.source.properties.id;
      }

      if (propName === 'selectedItems') {
        const nodes = e.source.properties.nodes;
        if (nodes.length > 1) {
          return undefined;
        }
        changedPlaneId = nodes[0].properties.id;
      }

      const hangarPlanes = [...hangars[currentHangar].planes];
      const currentPlane = hangarPlanes.find(plane => plane.id === changedPlaneId);

      currentPlane.offsetX = e.newValue.offsetX;
      currentPlane.offsetY = e.newValue.offsetY;

      const index = hangarPlanes.findIndex(plane => plane.id === changedPlaneId);

      hangarPlanes[index] = currentPlane;

      setHangars({
        ...hangars,
        [currentHangar]: {
          ...hangars[currentHangar],
          planes: hangarPlanes,
        }
      });

      // check for any overlap
      checkOverlap(currentPlane);
    }
  }
  
  return (
    <div>
      <Nav>
        <Nav.Item>
          <h4>
            Hangars
            <Button id="addHangarButton" type="button" size="sm" style={{ marginLeft: "0.5rem" }}>Add</Button>
          </h4>
          <Popover isOpen={addHangarsIsOpen} target="addHangarButton" toggle={onToggleAddHangars}>
            <PopoverHeader>Add a Hangar</PopoverHeader>
              <PopoverBody>
                <Form>
                  <Label for="hangarName">Nickname</Label>
                    <Input
                      type="name"
                      name="name"
                      id="hangarName"
                      onChange={e => onNicknameSet(e)}
                    />
                  <Label for="hangarWidth">Width (x-axis)</Label>
                    <Input
                      type="number"
                      name="width"
                      id="hangarWidth"
                      onChange={e => onDimensionSet(e)}
                    />
                  <Label for="">Length (y-axis)</Label>
                    <Input
                      type="number"
                      name="length"
                      id="hangarLength"
                      onChange={e => onDimensionSet(e)}
                    />
                  <Button onClick={e => onAddHangars(e)}>Submit</Button>
                </Form>
              </PopoverBody>
          </Popover>
        </Nav.Item>
        {
          Object.entries(hangars).map((hangar) => {
            const [key, value] = hangar;
            return (
              <Nav.Item>
                <Button
                  key={key}
                  id={key}
                  size="sm"
                  color={(currentHangar === key) ? "primary" : "secondary"}
                  style={{ marginLeft: "0.5rem" }}
                  onClick={() => {
                    setCurrentHangar(key);
                  }}
                >
                  {value.name}
                </Button>
              </Nav.Item>
            );
          })
        }
      </Nav>
      <div>
        {
          (currentHangar) ? 
            <div>
              <Nav>
                <Nav.Item className="hangar-navb">
                  <Button id="editHangarButton" size="sm">Edit Hangar</Button>
                  <Popover isOpen={editHangarIsOpen} target="editHangarButton" toggle={onToggleEditHangar}>
                  <PopoverHeader>Edit Hangar</PopoverHeader>
                    <PopoverBody>
                      <Form>
                        <Label for="hangarName">Nickname</Label>
                          <Input
                            type="name"
                            name="name"
                            id="hangarName"
                            onChange={e => onNicknameSet(e)}
                          />
                        <Label for="hangarWidth">Width (x-axis)</Label>
                          <Input
                            type="number"
                            name="width"
                            id="hangarWidth"
                            onChange={e => onDimensionSet(e)}
                          />
                        <Label for="">Length (y-axis)</Label>
                          <Input
                            type="number"
                            name="length"
                            id="hangarLength"
                            onChange={e => onDimensionSet(e)}
                          />
                        <Button onClick={e => onEditHangar(e)}>Submit</Button>
                      </Form>
                    </PopoverBody>
                </Popover>

                  <Button size="sm" onClick={removePlane}>Remove plane from hangar</Button>
                  <Button size="sm" onClick={deletePlane}>Delete plane</Button>
                </Nav.Item>
              </Nav>
              <DiagramComponent
                id="diagram"
                ref={diagram => (diagramInstance = diagram)}
                width = {
                  hangars[currentHangar].width
                }
                height = {
                  hangars[currentHangar].height
                }
                dataSourceSettings={{
                  id: "id",
                  dataSource: new DataManager(hangars[currentHangar].planes),
                  doBinding: (nodeModel, data, diagram) => {

                    diagram.clear();

                    nodeModel.id = data.id;
                    nodeModel.height = data.height;
                    nodeModel.width = data.width;
                    nodeModel.offsetX = data.offsetX;
                    nodeModel.offsetY = data.offsetY;
                    nodeModel.pivot = data.pivot;
                    nodeModel.style = data.style;
                    nodeModel.shape = data.shape;
                    nodeModel.annotations = data.annotations;
                  }
                }}
                click={onClickPlane}
                positionChange={onPositionChange}
              >
                <Inject services = {[BpmnDiagrams, DataBinding]}/>
              </DiagramComponent>
            </div> :
            <div></div>
        }
      </div>
    </div>
  );
}

export default Hangar;
/*

*/