// Imports
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Profile from "./screens/profile/Profile";
import "./App.css";

// App component
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/*<Route exact path="/" component={Login} />*/}
          {/* <Route exact path="/home" component={Home} /> */}
          {/* <Route exact path="/profile" component={Profile} /> */}
          <Profile/>
        </div>
      </BrowserRouter>
    );
  }
}

// Export
export default App;
