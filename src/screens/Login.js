import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Header from "../common/Header";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Redirect } from "react-router-dom";
import "./Login.css";

// Card container
const CardContainer = function(props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

/**
 *
 * @author Komal Agarwal
 * @description Login component
 *
 */

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginIsClicked: false,
      value: 0,
      usernameRequired: "dispNone",
      passwordRequired: "dispNone",
      authFailed: "dispNone",
      username: "correct",
      password: "correct",
      redirect: false
    };
    this.loginButtonHandler = this.loginButtonHandler.bind(this);
    this.loginClickHandler = this.loginClickHandler.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/Home" />;
    }
  };

  loginButtonHandler = () => {
    this.setState({ loginIsClicked: true });
  };

  loginClickHandler = () => {
    if (this.state.username && this.state.password) {
      if (
        this.state.username === "correct" &&
        this.state.password === "correct"
      ) {
        this.setRedirect();
      } else {
        this.authFailed = "dispBlock";
      }
    } else {
      this.setState({
        usernameRequired: "dispBlock",
        passwordRequired: "dispBlock"
      });
    }
  };

  inputUsernameChangeHandler = e => {
    this.setState({ username: e.target.value });
  };
  inputPasswordChangeHandler = e => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <div>
        <Header extendedHeader={false} searchBar={false} profile={false} />
        <div />
        {this.renderRedirect()}
        <div className="top-container">
          <CardContainer className="login-card-container">
            <Card className="login-card">
              <CardContent className="card-content">
                <Typography variant="h5" component="h2">
                  LOGIN
                </Typography>

                <FormControl required>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    type="text"
                    username={this.state.username}
                    onChange={this.inputUsernameChangeHandler}
                  />
                  <FormHelperText className={this.state.usernameRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    password={this.state.password}
                    onChange={this.inputPasswordChangeHandler}
                  />
                  <FormHelperText className={this.state.passwordRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.authFailed}>
                    <span className="red">
                      Incorrect username and/or password
                    </span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.loginClickHandler}
                >
                  LOGIN
                </Button>
              </CardContent>
            </Card>
          </CardContainer>
        </div>
      </div>
    );
  }
}

// Export
export default Login;
