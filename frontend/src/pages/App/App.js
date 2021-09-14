import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import CustomNavBar from "../../components/NavBar";
import Todo from "../Todo/Todo";
import Hangar from "../Hangar/Hangar";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <CustomNavBar/>
            <Switch>
              <Route exact path="/" component={Todo}/>
              <Route exact path="/hangar" component={Hangar}/>
            </Switch>
        </div>
      </Router>
    );
  }

}

export default App;
