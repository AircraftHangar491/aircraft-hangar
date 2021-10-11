import React from "react";
import CustomNavBar from "../../components/NavBar";
import Entity from "../../components/Entity/Entity";
import Hangar from "../../components/Hangar/Hangar";

const Layout = (
  {
    hangars,
    setHangars,
    planes,
    setPlanes,
    planeCount,
    setPlaneCount,
  }) => {
  
  return (
    <div>
      <CustomNavBar/>
      <div className="container hangar">
        <div className="row">
          <div className="col-sm col-md-3">
            <Entity
              hangars={hangars}
              setHangars={setHangars}
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
