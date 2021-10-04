import React, { useEffect, useRef, useState } from 'react';
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
import { planeInfo, updatePlaneInfo } from "../../utils/planeInfo";

const Entity = (
  {
    planes,
    setPlanes,
    planeCount,
    setPlaneCount,
  }) => {

  const [planeType, setPlaneType] = useState('');
  const [addPlanesIsOpen, setAddPlanesIsOpen] = useState(false);
  const [planeIsOpen, setPlaneIsOpen] = useState(false);

  const onShowMore = (id, e)  => {
    const list = [...planes];
    
    const current = {...list.find(plane => plane.id === id)};
    current.isOpen = !current.isOpen;

    const index = list.findIndex(plane => plane.id === id);
    list[index] = current;

    setPlanes(list)
  }

  const onAddAirplane = (e) => { 
    //get the plane type
    const type = e.target.id;

    setPlaneCount(prevState => {
      return {
        ...prevState,
        [type]: planeCount[type] + 1,
      }
    });

    setPlaneType(type);
  }

  useEffect(() => {
    if (planeType) {

      let type;
      if (planeType === "c17") {
        type = "C-17";
      }
  
      if (planeType === "kc135") {
        type = "KC-135"
      }
  
      if (planeType === "f22") {
        type = "F-22"
      }

      const newPlane = planeInfo(`${type} ${planeCount[planeType]}`, type);

      setPlanes([...planes, newPlane]);
      setPlaneType('');
    }
  }, [planeCount]);

  const onPlaneTypeSelect = (e, id) => {
    const selected = e.target.value;

    const updatedList = updatePlaneInfo(id, selected);

    setPlanes(updatedList);
  }
  
  return (
    <div>
      <CustomNavBar/>
      <h2 className="container">Add Entities</h2>
      <Form className="container">
        <FormGroup>
          <Label>
            <span className="form-title">Hangars</span>
            <Button size="sm">Add</Button>
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            <span className="form-title">Airplanes</span>
            <ButtonDropdown direction="right" isOpen={addPlanesIsOpen} toggle={() => setAddPlanesIsOpen(!addPlanesIsOpen)}>
              <DropdownToggle caret size="sm">Add</DropdownToggle>
              <DropdownMenu>
                <DropdownItem id="c17" size="sm" onClick={e => onAddAirplane(e)}>Add C-17</DropdownItem>
                <DropdownItem id="kc135" size="sm" onClick={e => onAddAirplane(e)}>Add KC-135</DropdownItem>
                <DropdownItem id="f22" size="sm" onClick={e => onAddAirplane(e)}>Add F-22</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Label>
          {planes.map((plane) => {
              return (
                <div key={plane.id}>
                  <Button id={plane.id} onClick={e => onShowMore(plane.id, e)}>{plane.name}</Button>
                  <Collapse isOpen={plane.isOpen}>
                    <Label>Name</Label>
                    <Input
                      type="name"
                      name="name"
                      id="planeName"
                      placeholder={plane.name}
                    />
                    <Label>Aircraft Type</Label>
                    <Input
                      type="select"
                      name="select"
                      id="planeType"
                      value={plane.type}
                      onChange={e => onPlaneTypeSelect(e, plane.id)}
                    >
                      <option>C-17</option>
                      <option>KC-135</option>
                      <option>F-22</option>
                    </Input>
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
  );
}

export default Entity;