// Imports
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import "./Header.css";

// Header Component
class Header extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    anchorEl: null,
    extendedHeader: false,
    searchBar: false,
    profile: false,
    profileImage: undefined,
    redirectHome: false
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  setRedirectHome = () => {
    this.setState({
      redirectHome: true
    });
  };

  setRedirectProfile = img => {
    this.setState({
      redirectProfile: true,
      profileImage: img
    });
  };

  renderRedirect = img => {
    if (this.state.redirectHome) {
      window.sessionStorage.removeItem("access-token");
      return <Redirect to="/" />;
    }
    if (this.state.redirectProfile) {
      return (
        <Redirect
          to={{
            pathname: "/profile",
            state: { image: this.state.profileImage }
          }}
        />
      );
    }
  };

  componentDidMount() {
    this.setState({
      extendedHeader: this.props.extendedHeader,
      searchBar: this.props.searchBar,
      profile: this.props.profile
    });
  }

  render() {
    const postFilter = this.props.filterPostsFunction;
    const image = this.props.image;
    const open = Boolean(this.state.anchorEl);
    return (
      <div className="header-container">
        {this.renderRedirect()}
        {this.state.extendedHeader ? (
          <AppBar className="navbar" position="static">
            <Toolbar>
              <Grid
                justify="space-between" // Add it here :)
                container
                style={{ alignItems: "center" }}
                spacing={2}
              >
                <Typography
                  variant="h6"
                  color="inherit"
                  style={{ fontSize: "18px" }}
                >
                  Image Viewer
                </Typography>
                {this.state.searchBar ? (
                  <div className="search-bar-container">
                    <SearchIcon className="search-icon" />
                    <InputBase
                      className="search-bar"
                      placeholder="Search..."
                      onChange={postFilter}
                    />
                  </div>
                ) : null}
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  {this.state.profile ? (
                    <Avatar
                      style={{ flex: 1 }}
                      className="user-profile-avatar-profilePage"
                      alt="Remy Sharp"
                      src={image}
                    />
                  ) : (
                    <Avatar
                      style={{ flex: 1 }}
                      className="user-profile-avatar"
                      alt="User"
                      src={image}
                    />
                  )}
                </IconButton>
                <div>
                  <Menu
                    className="my-menu"
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    children="menu-list"
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    {!this.state.profile ? (
                      <div className="menu-item-container">
                        <MenuList id="menu-list">
                          <MenuItem
                            className="menu-item"
                            onClick={() => {
                              this.setRedirectProfile(image);
                            }}
                          >
                            My Account
                          </MenuItem>
                          <hr />
                          <MenuItem
                            className="menu-item"
                            onClick={this.setRedirectHome}
                          >
                            Logout
                          </MenuItem>
                        </MenuList>
                      </div>
                    ) : (
                      <div className="menu-item-container">
                        <MenuList id="menu-list">
                          <MenuItem
                            className="menu-item"
                            onClick={this.setRedirectHome}
                          >
                            Logout
                          </MenuItem>
                        </MenuList>
                      </div>
                    )}
                  </Menu>
                </div>
              </Grid>
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar className="navbar" position="static">
            <Toolbar>
              <Grid
                justify="space-between" // Add it here :)
                container
                style={{ alignItems: "center" }}
                spacing={2}
              >
                <Typography
                  variant="h6"
                  color="inherit"
                  style={{ fontSize: "18px" }}
                >
                  Image Viewer
                </Typography>
              </Grid>
            </Toolbar>
          </AppBar>
        )}
      </div>
    );
  }
}

// Export
export default Header;

