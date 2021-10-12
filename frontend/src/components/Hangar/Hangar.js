import React, { useState, useEffect } from "react";
import "./Hangar.css";
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Label,
  Input,
  Popover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";
import {
  Nav,
  Tabs,
  Tab
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
import { hangarAlgorithm, collisionCheck } from "./Hangar.utils";
import { hangarInfo } from "../../utils/hangarInfo";

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

  const [activeTab, setActiveTab] = useState('1');

  const [addHangarsIsOpen, setAddHangarsIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [hangarLength, setHangarLength] = useState(0);
  const [hangarWidth, setHangarWidth] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  const onToggleAddHangars = (e) => {
    // toggle button true or false
    setAddHangarsIsOpen(!addHangarsIsOpen);
  }

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
  }

  const checkOverlap = (changedPlane) => {
    const currentPlanes = [...planes];

    for (const index in currentPlanes) {
      // skip if current[index] is the same as the plane we just moved
      if (currentPlanes[index].id === changedPlane.id) {
        continue;
      }
        
      // check smaller plane if the moved plane is a big plane
      if (changedPlane.type === "C-17" || changedPlane.type === "KC-135") {
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

      /*
      console.log(plane);

      plane.offsetX = e.newValue.offsetX;
      plane.offsetY = e.newValue.offsetY;

      current[changedPlaneId] = plane;
      */
      //console.log(current);

      /*
      setPlanes({
        ...planes,
        [changedPlaneId]: {
          ...planes[changedPlaneId],
          offsetX: e.newValue.offsetX,
          offsetY: e.newValue.offsetY
        }
      });
      */

      const hangarPlanes = [...hangars[currentHangar].planes];
      const currentPlane = hangarPlanes.find(plane => plane.id === changedPlaneId);

      console.log(currentPlane);

      currentPlane.offsetX = e.newValue.offsetX;
      currentPlane.offsetY = e.newValue.offsetY;

      const index = hangarPlanes.findIndex(plane => plane.id === changedPlaneId);
      console.log(index);

      hangarPlanes[index] = currentPlane;

      setHangars({
        ...hangars,
        [currentHangar]: {
          ...hangars[currentHangar],
          planes: hangarPlanes,
        }
      });

      // check for any overlap
      //checkOverlap(plane);
      
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
              <PopoverHeader>Add a hangar</PopoverHeader>
                <PopoverBody>
                  <Form>
                    <Label for="hangarName">Nickname</Label>
                      <Input
                        type="name"
                        name="name"
                        id="hangarName"
                        onChange={e => onNicknameSet(e)}
                      />
                    <Label for="">Length (x-axis)</Label>
                      <Input
                        type="number"
                        name="length"
                        id="hangarLength"
                        onChange={e => onDimensionSet(e)}
                      />
                    <Label for="hangarWidth">Width (y-axis)</Label>
                      <Input
                        type="number"
                        name="width"
                        id="hangarWidth"
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
              <DiagramComponent
                id="diagram"
                ref={diagram => (diagramInstance = diagram)}
                width = {
                  720
                }
                height = {
                  820
                }
                dataSourceSettings={{
                  id: currentHangar,
                  dataManager: new DataManager(hangars[currentHangar].planes),
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
                    //console.log(nodeModel);
                    //console.log(data);
                    //console.log(diagram);
                  }
                }}
                /*
                scrollSettings={
                  {
                    scrollLimit: "Diagram"
                  }
                }
                pageSettings={
                  {
                    boundaryConstraints: "Diagram"
                  }
                }
                */
                positionChange={onPositionChange}
              >
                <Inject services = {[BpmnDiagrams, DataBinding]}/>
              </DiagramComponent> :
              <div></div>
          }
        </div>
    </div>
  );
}

export default Hangar;
/*

*/