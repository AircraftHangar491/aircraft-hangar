import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hangar from "../Hangar/Hangar";
import Entity from "../Entity/Entity";
import useLocalStorage from "../../utils/useLocalStorage";

const App = () => {

  // list of all planes
  const [planes, setPlanes] = useLocalStorage('planes', []);

  // count of all plane types
  const [planeCount, setPlaneCount] = useLocalStorage('planeCount', { c17: 0, kc135: 0, f22: 0 });

  return (
    <Router>
      <div>
        <Switch>
          <Route
              render={(props) => {
                return (
                  <Entity
                    {...props}
                    planes={planes} 
                    setPlanes={setPlanes}
                    planeCount={planeCount}
                    setPlaneCount={setPlaneCount}
                  />)
              }}
              exact path="/"
            />
          <Route exact path="/layout" component={Hangar}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
