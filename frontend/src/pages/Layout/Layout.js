import React, { useState } from "react";
import CustomNavBar from "../../components/NavBar";
import Entity from "../../components/Entity/Entity";
import Hangar from "../../components/Hangar/Hangar";

const Layout = (
  {
    hangars,
    setHangars,
    hangarCount,
    setHangarCount,
    planes,
    setPlanes,
    planeCount,
    setPlaneCount,
  }) => {
  
  const [currentHangar, setCurrentHangar] = useState();

  return (
    <div>
      <CustomNavBar/>
      <div className="container hangar">
        <div className="row">
          <div className="col-sm col-md-3">
            <Entity
              hangars={hangars}
              setHangars={setHangars}
              currentHangar={currentHangar}
              setCurrentHangar={setCurrentHangar}
              planes={planes} 
              setPlanes={setPlanes}
              planeCount={planeCount}
              setPlaneCount={setPlaneCount}
            />   
          </div>
          <div className="col-sm col-md-9 layout">
            <Hangar
              hangars={hangars}
              setHangars={setHangars}
              currentHangar={currentHangar}
              setCurrentHangar={setCurrentHangar}
              hangarCount={hangarCount}
              setHangarCount={setHangarCount}
              planes={planes} 
              setPlanes={setPlanes}
              planeCount={planeCount}
              setPlaneCount={setPlaneCount}
            />
          </div>
        </div>
      </div>
    </div>
  );  
}

export default Layout;
