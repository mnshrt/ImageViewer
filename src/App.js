// Imports
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import "./App.css";

// App component
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          {/* <Route exact path="/" component={Login} /> */}
          <Route exact path="/home" component={Home} />
          {/* <Route exact path="/profile" component={Profile} /> */}
        </div>
      </HashRouter>
    );
  }
}

// Export
export default App;
