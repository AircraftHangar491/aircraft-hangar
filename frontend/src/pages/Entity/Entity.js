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
import { c17, f22, kc135 } from "../../utils/planeInfo";

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
      let newPlane;

      if (planeType === "c17") {
        newPlane = c17(`C-17 ${planeCount.c17}`);
      }
  
      if (planeType === "kc135") {
        newPlane = kc135(`KC-135 ${planeCount.kc135}`)
      }
  
      if (planeType === "f22") {
        newPlane = f22(`F-22 ${planeCount.f22}`)
      }

      setPlanes([...planes, newPlane]);
    }
  }, [planeCount, planeType]);
  
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
                      id="name"
                      placeholder={plane.name}
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
  );
}

export default Entity;
