import React, { useEffect, useState } from 'react';
import "./Entity.css"
import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Popover,
  PopoverBody,
  PopoverHeader,
} from 'reactstrap';
import { planeInfo, updatePlaneInfo } from "../../utils/planeInfo";

const Entity = (
  {
    hangars,
    setHangars,
    planes,
    setPlanes,
    planeCount,
    setPlaneCount,
  }) => {

  const [addPlanesIsOpen, setAddPlanesIsOpen] = useState(false);

  // for the add form
  const [planeType, setPlaneType] = useState();
  const [nickname, setNickname] = useState("");

  const onShowMore = (id, e)  => {
    const list = [...planes];
    
    const current = {...list.find(plane => plane.id === id)};
    current.isOpen = !current.isOpen;

    const index = list.findIndex(plane => plane.id === id);
    list[index] = current;

    setPlanes(list)
  }

  const onToggleAddPlane = (e) => {
    // toggle button true or false
    setAddPlanesIsOpen(!addPlanesIsOpen);

    // check if user opened the add button
      // if so then set the default plane type
    if (!addPlanesIsOpen === true) {
      setPlaneType("C-17");
    }
  }

  const onAddAirplane = (e) => { 

    // set default nickname if the user did not make one
    if (nickname === "") {
      setNickname(`${planeType} ${planeCount[planeType] + 1}`);
    }

    setPlaneCount(prevState => {
      return {
        ...prevState,
        [planeType]: planeCount[planeType] + 1,
      }
    });

    // close popup
    setAddPlanesIsOpen(!addPlanesIsOpen);
  }

  useEffect(() => {
    if (planeType) {

      let type;
      if (planeType === "C-17") {
        type = "C-17";
      }
  
      if (planeType === "KC-135") {
        type = "KC-135"
      }
  
      if (planeType === "F-22") {
        type = "F-22"
      }

      const newPlane = planeInfo(nickname, type);

      // add planes
      setPlanes([...planes, newPlane]);

      // reset form states
      setPlaneType("");
      setNickname("");
    }
  }, [planeCount]);

  // --------- Creating plane --------
  const onPlaneTypeSelect = (e) => {
    const selected = e.target.value;
    setPlaneType(selected);
  }

  const onNicknameSet = (e) => {
    const nickname = e.target.value;
    setNickname(nickname);
  }


  // ------ Updating plane ----------

  const onNicknameUpdate = (e, id, type) => {
    const { value } = e.target;

    const updatedList = updatePlaneInfo(id, type, value);
    setPlanes(updatedList);
  }

  const onPlaneTypeUpdate = (e, id, name) => {
    const newType = e.target.value;

    // update plane count
    const plane = planes.find(plane => plane.id === id);
    const oldType = plane.type;
    setPlaneCount(prevState => {
      return {
        ...prevState,
        [oldType]: prevState[oldType] - 1,
        [newType]: prevState[newType] + 1,
      }
    });

    // update plane list
    const updatedList = updatePlaneInfo(id, newType, name);
    setPlanes(updatedList);
  }
  
  return (
    <div>
      <Card>
        <CardHeader>
          <h4>
            Aircrafts
            <Button id="addPlaneButton" type="button" size="sm" style={{ marginLeft: "0.5rem" }}>Add</Button>
          </h4>
          <Popover isOpen={addPlanesIsOpen} target="addPlaneButton" toggle={onToggleAddPlane}>
            <PopoverHeader>Add an airplane</PopoverHeader>
            <PopoverBody>
              <Form>
                <Label for="planeName">Nickname</Label>
                  <Input
                    type="name"
                    name="name"
                    id="planeName"
                    onChange={e => onNicknameSet(e)}
                  />
                <Label for="planeType">Aircraft Type</Label>
                  <Input
                    type="select"
                    name="select"
                    id="planeType"
                    onChange={e => onPlaneTypeSelect(e)}
                  >
                    <option>C-17</option>
                    <option>KC-135</option>
                    <option>F-22</option>
                  </Input>
                  <Button onClick={e => onAddAirplane(e)}>Submit</Button>             
              </Form>
            </PopoverBody>
          </Popover>
        </CardHeader>
        <CardBody>
          <Form className="container">
            {planes.map((plane) => {
              return (
                <div className="plane-list" key={plane.id}>
                  <Button block id={plane.id} onClick={e => onShowMore(plane.id, e)}>{plane.type} {`(${plane.name})`}</Button>
                  <Collapse isOpen={plane.isOpen}>
                    <Label>Name</Label>
                    <Input
                      type="name"
                      name="name"
                      id="planeName"
                      value={plane.name}
                      onChange={e => onNicknameUpdate(e, plane.id, plane.type)}
                    />
                    <Label>Aircraft Type</Label>
                    <Input
                      type="select"
                      name="select"
                      id="planeType"
                      value={plane.type}
                      onChange={e => onPlaneTypeUpdate(e, plane.id, plane.name)}
                    >
                      <option>C-17</option>
                      <option>KC-135</option>
                      <option>F-22</option>
                    </Input>
                  </Collapse>
                </div>
              );
            })}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Entity;
