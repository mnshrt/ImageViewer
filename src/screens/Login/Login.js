//Imports
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Redirect } from "react-router-dom";
import Header from "../../common/Header";
import "./Login.css";

// Card container
const CardContainer = function(props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

CardContainer.propTypes = {
  children: PropTypes.node.isRequired
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
      inputUsername: "",
      inputPassword: "",
      redirect: false
    };
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

  /* loginButtonHandler = () => {
    this.setState({ loginIsClicked: true });
  };*/

  loginClickHandler = () => {
    let username = this.state.username;
    let password = this.state.password;

    this.state.inputUsername === ""
      ? this.setState({ usernameRequired: "dispBlock", authFailed: "dispNone" })
      : this.setState({ usernameRequired: "dispNone" });
    this.state.inputPassword === ""
      ? this.setState({ passwordRequired: "dispBlock", authFailed: "dispNone" })
      : this.setState({ passwordRequired: "dispNone" });

    if (this.state.inputUsername !== "" && this.state.inputPassword !== "") {
      //checking with the saved password
      if (
        this.state.inputUsername === username &&
        this.state.inputPassword === password
      ) {
        this.setState({
          usernameRequired: "dispNone",
          passwordRequired: "dispNone",
          authFailed: "dispNone"
        });
        //setting access token variable in session Storage
        sessionStorage.setItem(
          "access-token",
          "8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65"
        );

        //add the routing for the home page here
        this.setRedirect();
      } else {
        this.setState({ authFailed: "dispBlock" });
      }
    }
  };

  inputUsernameChangeHandler = e => {
    this.setState({ inputUsername: e.target.value });
  };
  inputPasswordChangeHandler = e => {
    this.setState({ inputPassword: e.target.value });
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
                <Typography
                  variant="headline"
                  component="h2"
                  style={{ marginBottom: "10px" }}
                >
                  LOGIN
                </Typography>

                <FormControl className="login-input-field" required>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    type="text"
                    username={this.state.inputUsername}
                    onChange={this.inputUsernameChangeHandler}
                  />
                  <FormHelperText className={this.state.usernameRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl className="login-input-field" required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    password={this.state.inputPassword}
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
