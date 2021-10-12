import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import useLocalStorage from "../../utils/useLocalStorage";

const App = () => {

  // list of hangars
  const [hangars, setHangars] = useLocalStorage("hangars", []);

  const [hangarCount, setHangarCount] = useLocalStorage("hangarCount", 0);

  // list of all planes
  const [planes, setPlanes] = useLocalStorage('planes', []);

  // count of all plane types
  const [planeCount, setPlaneCount] = useLocalStorage('planeCount', { "C-17": 0, "KC-135": 0, "F-22": 0 });

  return (
    <Router>
      <div>
        <Switch>
          <Route
            render={(props) => {
              return (
                <Layout
                  {...props}
                  hangars={hangars}
                  setHangars={setHangars}
                  hangarCount={hangarCount}
                  setHangarCount={setHangarCount}
                  planes={planes}
                  setPlanes={setPlanes}
                  planeCount={planeCount}
                  setPlaneCount={setPlaneCount}
                />
              )
            }}
            exact path="/" 
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
