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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Popover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";
import {
  Tab
} from "semantic-ui-react";
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
    planes,
    setPlanes,
    planeCount,
    setPlaneCount,
  }) => {

  const [activeTab, setActiveTab] = useState("1");

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
    const newHangar = hangarInfo(nickname, hangarLength, hangarWidth)

    setHangars(prevState => {
      return (
        {
          ...prevState,
          [newHangar.id]: newHangar,
        }
      );
    });

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
      const current = [...planes];
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
      setPlanes(current);

      // check for any overlap
      checkOverlap(plane);
    }
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
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
        </NavItem>
        <NavItem>
          <NavLink onClick={() => toggleTab("1")}>Hangar 1</NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <DiagramComponent
            id="diagram"
            ref={diagram => (diagramInstance = diagram)}
            width = {
              "720px"
            }
            height = {
              "820px"
            }
            dataSourceSettings={{
              id: "id",
              dataManager: new DataManager(planes),
              doBinding: (nodeModel, data, diagram) => {
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
          </DiagramComponent>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Hangar;
/*

*/