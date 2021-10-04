import React, { Component } from "react";
import "./Hangar.css";
import {
  DiagramComponent,
  Inject,
  BpmnDiagrams,
} from "@syncfusion/ej2-react-diagrams";
import CustomNavBar from "../../components/NavBar";
import { getCorners, checkTopLeft, checkTopRight, checkBottomLeft, checkBottomRight } from "./Hangar.utils";

const Hangar = (
  {
    planes,
    setPlanes,
  }) => {

  /*
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

    // event functions
    this.onPositionChange = this.onPositionChange.bind(this);
  }
  */

  const checkOverlap = (changedPlane) => {
    const currentPlanes = [...planes];

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
      <CustomNavBar/>
      <div className="container hangar">
        <div className="row">
          <div className="col-sm">
            <h1>space for entity bank</h1>
          </div>
          <div className="col-sm layout">
            <DiagramComponent
              id="diagram"
              width = {
                '720px'
              }
              height = {
                '820px'
              }
              // Add node
              nodes = {
                planes
              }
              positionChange={onPositionChange}
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

export default Hangar;