import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hangar from "../Hangar/Hangar";
import Entity from "../Entity/Entity";
import useLocalStorage from "../../utils/useLocalStorage";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
            <Switch>
              <Route exact path="/" component={Hangar}/>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
