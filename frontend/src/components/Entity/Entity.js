import React, { useEffect, useState } from 'react';
import "./Entity.css"
import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
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
import { hangarAlgorithm } from '../Hangar/Hangar.utils';

const Entity = (
  {
    hangars,
    setHangars,
    currentHangar,
    setCurrentHangar,
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
    const list = {...planes.pending};
    
    console.log(list);

    const current = list[id];
    current.isOpen = !current.isOpen;

    list[id] = current;

    setPlanes({
      ...planes,
      pending: list,
    })
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
      setPlanes({
        ...planes,
        pending: {
          ...planes.pending,
          [newPlane.id]: newPlane
        }
      });

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
    const list = {...planes.pending};
    const oldType = list[id].type;

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

  // ------- Add plane to hangar -------

  const onAddToHangar = (e, id) => {
    if (currentHangar) {
      // add the plane to the hangar
      const newPlane = planes.pending[id];
      setHangars({
        ...hangars,
        [currentHangar]: {
          ...hangars[currentHangar],
          planes: [
            ...hangars[currentHangar].planes,
            newPlane
          ]
        }
      });

      const currentPlanes = {...planes};

      // add the plane to the added list
      currentPlanes.added[id] = currentPlanes.pending[id];

      // remove the added plane from pending list
      delete currentPlanes.pending[id];

      setPlanes(currentPlanes);
    }
  };

  // -------------- Add planes using algorithm ----------

  const addPlanesAlgorithm = () => {
    const { newPlaneCount, newPlanes, newHangars } = hangarAlgorithm(planeCount, planes, hangars);
    
    setPlaneCount({ ...newPlaneCount });
    setPlanes({ ...newPlanes });
    setHangars({ ...newHangars });
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
        <CardBody className="scroll">
          <Form className="container">
            {Object.entries(planes.pending).map((plane) => {
              const [key, value] = plane;
              return (
                <div className="plane-list" key={key}>
                  <Button className="block" id={key} onClick={e => onShowMore(key, e)}>{value.type} {`(${value.name})`}</Button>
                  <Collapse isOpen={value.isOpen}>
                    <Label>Name</Label>
                    <Input
                      type="name"
                      name="name"
                      id="planeName"
                      value={value.name}
                      onChange={e => onNicknameUpdate(e, key, value.type)}
                    />
                    <Label>Aircraft Type</Label>
                    <Input
                      type="select"
                      name="select"
                      id="planeType"
                      value={value.type}
                      onChange={e => onPlaneTypeUpdate(e, key, value.name)}
                    >
                      <option>C-17</option>
                      <option>KC-135</option>
                      <option>F-22</option>
                    </Input>
                    <Button onClick={e => onAddToHangar(e, key)}>Add to hangar</Button>
                  </Collapse>
                </div>
              );
            })}
          </Form>
        </CardBody>
        <CardFooter>
          <Button className="block" onClick={() => addPlanesAlgorithm()}>Auto</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Entity;
