// Imports
import React, { Component } from "react";

// Comment component
const Comment = props => {
  return (
    <div className="Post-caption">
      <strong>
        {props.user}
        {":"}
      </strong>{" "}
      {props.comment}
    </div>
  );
};

// Export
export default Comment;
