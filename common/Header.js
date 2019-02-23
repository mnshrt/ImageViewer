// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import "./Header.css";

// Component
const Header = props => {
  const { classes } = props;
  return (
    <div className="header-container">
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
            <div className="search-bar-container">
              <SearchIcon className="search-icon" />
              <InputBase className="search-bar" placeholder="Search..." />
            </div>
            <IconButton>
              <Avatar
                style={{ flex: 1 }}
                className="user-profile-avatar"
                alt="Remy Sharp"
                src="https://images.upgrad.com/dbcba774-1e6f-4838-b4ad-816468779a4b-Screenshot%202018-10-04%20at%205.51.45%20PM.png"
              />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

// Export
export default Header;
