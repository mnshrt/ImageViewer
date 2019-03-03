import React, { Component } from "react";
import InfoSection from "./infoSection/InfoSection";
import ImageGridListSection from "./imageGridListSection/ImageGridListSection";
import Header from "../../common/Header";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  state = {
    profileImage: undefined
  };

  componentDidMount() {
    this.setState({
      profileImage: this.props.location.state.image
    });
  }

  render() {
    return (
      <div>
        {/** Here we need to provide the props to the header*/}
        <Header
          image={this.state.profileImage}
          extendedHeader={true}
          searchBar={false}
          profile={true}
        />
        <InfoSection />
        <ImageGridListSection />
      </div>
    );
  }
}
export default withRouter(Profile);
