import React, { Component } from "react";
import InfoSection from "./infoSection/InfoSection";
import ImageGridListSection from "./imageGridListSection/ImageGridListSection";
import Header from "../../common/Header";
import { withRouter } from "react-router-dom";

class Profile extends Component {

  render() {
    return (
      <div>
        {/** Here we need to provide the props to the header*/
        <InfoSection />
        <ImageGridListSection />
      </div>
    );
  }
}
export default withRouter(Profile);
