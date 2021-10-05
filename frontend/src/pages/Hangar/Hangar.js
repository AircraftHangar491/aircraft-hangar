import React, { useState, useEffect } from "react";
import "./Hangar.css";
import {
  DiagramComponent,
  DataBinding,
  Inject,
  BpmnDiagrams,
} from "@syncfusion/ej2-react-diagrams";
import {
  DataManager,
} from '@syncfusion/ej2-data';
import { Button } from "reactstrap";
import CustomNavBar from "../../components/NavBar";
import { getCorners, checkTopLeft, checkTopRight, checkBottomLeft, checkBottomRight, hangarAlgorithm } from "./Hangar.utils";

let diagramInstance;

const Hangar = (
  {
    planes,
    setPlanes,
  }) => {

  const checkOverlap = (changedPlane) => {
    const currentPlanes = [...planes];

    // get corners
    const changedPlaneCorners = getCorners(changedPlane);

    for (const index in currentPlanes) {
      // skip if current[index] is the same as the plane we just moved
      if (currentPlanes[index].id === changedPlane.id) {
        continue;
      }

      const planeCorners = getCorners(currentPlanes[index]);
        
      if (
        checkTopLeft(changedPlaneCorners, planeCorners) ||
        checkTopRight(changedPlaneCorners, planeCorners) ||
        checkBottomLeft(changedPlaneCorners, planeCorners) ||
        checkBottomRight(changedPlaneCorners, planeCorners)
      ) {
        console.log("Touching!");
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
      // checkOverlap(plane);
    }
  }

  const onRender = (e, hangar) => {
    console.log(e);
    
    const planeList = hangarAlgorithm(planes, hangar);
    setPlanes(planeList);

    console.log(diagramInstance);
    //diagramInstance.updateNode(updated.id, { offsetX: updated.offsetX, offsetY: updated.offsetY });
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
            <div>
              <DiagramComponent
                id="diagram"
                ref={diagram => (diagramInstance = diagram)}
                width = {
                  '720px'
                }
                height = {
                  '820px'
                }
                /*
                // Add node
                nodes = {
                  planes
                }
                */
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

                    console.log(nodeModel);
                    console.log(data);
                    console.log(diagram);
                  }
                }}
                positionChange={onPositionChange}
                //enablePersistence="true"
              >
                <Inject services = {[BpmnDiagrams, DataBinding]}/>
              </DiagramComponent>
            </div>
            <div>
              <Button onClick={e => onRender(e, {width: 720, height: 820})}>Render</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default Hangar;