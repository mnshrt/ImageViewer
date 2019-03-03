// Imports
import React, { Component, useDebugValue } from "react";
import { Redirect } from "react-router-dom";
import Post from "../../common/Post";
import Header from "../../common/Header";
import "./Home.css";

// Instagram API access token
const ACCESS_TOKEN = window.sessionStorage.getItem("access-token");

/**
 *
 * @author Karan Pillai
 * @description Home component
 *
 */

class Home extends Component {
  // Constructor
  constructor() {
    super();
    this.filterPosts = this.filterPosts.bind(this);
  }

  // Initialize state
  state = {
    firstImage: {
      username: "",
      avatar: undefined,
      caption: undefined,
      image: undefined,
      likes: undefined
    },
    secondImage: {
      username: "",
      avatar: undefined,
      caption: undefined,
      image: undefined,
      likes: undefined
    },
    captions: {
      captionOne: undefined,
      captionTwo: undefined
    },
    display: {
      firstImage: {
        forDisplay: true
      },
      secondImage: {
        forDisplay: true
      }
    }
  };

  /**
   *
   * @description Method that asynchronously fetches data associated with the
   * given access token from the Instagram API
   *
   */
  getData = async () => {
    // Call the first enpoint
    const api_call_general = await fetch(
      `https://api.instagram.com/v1/users/self/?access_token=${ACCESS_TOKEN}`
    );
    // Store the retrieved data
    const profileData = await api_call_general.json();
    // Call the second endpoint
    const api_call = await fetch(
      `https://api.instagram.com/v1/users/self/media/recent?access_token=${ACCESS_TOKEN}`
    );
    // Store the retrieved data
    const data = await api_call.json();

    // If we successfully retrieve the data, add our retrieved data to state
    if (data && profileData) {
      this.setState({
        firstImage: {
          username: profileData.data.username,
          avatar: profileData.data.profile_picture,
          image: data.data[2].images.standard_resolution.url,
          caption: data.data[2].caption.text,
          likes: data.data[2].likes.count
        },
        secondImage: {
          username: profileData.data.username,
          avatar: profileData.data.profile_picture,
          image: data.data[1].images.standard_resolution.url,
          caption: data.data[1].caption.text,
          likes: data.data[1].likes.count
        },
        captions: {
          captionOne: data.data[2].caption.text,
          captionTwo: data.data[1].caption.text
        },
        display: {
          firstImage: {
            forDisplay: true
          },
          secondImage: {
            forDisplay: true
          }
        }
      });
    }
  };

  /**
   *
   * @description Method to filter posts based on input in the search bar
   * @param {*} e event param
   *
   */
  filterPosts(e) {
    e.preventDefault();
    // Grab input value from search bar
    const searchInput = e.target.value.toLowerCase();
    // Store caption associated with the first image as an array and split
    const captionListOne = this.state.captions.captionOne.split(" ");
    // Store caption associated the second image and split
    const captionListTwo = this.state.captions.captionTwo.split(" ");
    console.log(captionListOne);
    // Loop through both out caption arrays and compare values
    for (let i = 0; i < captionListOne.length; i++) {
      for (let j = 0; j < captionListTwo.length; j++) {
        if (
          captionListOne[i].toLowerCase().includes(searchInput.split(" ")) &&
          captionListTwo[j].toLowerCase().includes(searchInput.split(" "))
        ) {
          this.setState({
            display: {
              firstImage: {
                forDisplay: true
              },
              secondImage: {
                forDisplay: true
              }
            }
          });
        } else if (
          !captionListTwo[j].toLowerCase().includes(searchInput.split(" ")) &&
          !captionListOne[i].toLowerCase().includes(searchInput.split(" "))
        ) {
          this.setState({
            display: {
              firstImage: {
                forDisplay: false
              },
              secondImage: {
                forDisplay: false
              }
            }
          });
        } else if (
          captionListTwo[j].toLowerCase().includes(searchInput.split(" ")) &&
          !captionListOne[i].toLowerCase().includes(searchInput.split(" "))
        ) {
          this.setState({
            display: {
              secondImage: {
                forDisplay: true
              },
              firstImage: {
                forDisplay: false
              }
            }
          });
        } else if (
          captionListOne[i].toLowerCase().includes(searchInput.split(" ")) &&
          !captionListTwo[j].toLowerCase().includes(searchInput.split(" "))
        ) {
          this.setState({
            display: {
              secondImage: {
                forDisplay: false
              },
              firstImage: {
                forDisplay: true
              }
            }
          });
        }
      }
    }
  }
  // get data
  componentDidMount() {
    this.getData();
  }

  // Render method
  render() {
    return (
      <div>
        <Header
          image={this.state.firstImage.avatar}
          filterPostsFunction={this.filterPosts}
          extendedHeader={true}
          searchBar={true}
          profile={false}
        />
        <section className="homepage-main">
          {// Conditionally render posts
          this.state.display.firstImage.forDisplay ? (
            <Post
              username={this.state.firstImage.username}
              avatar={this.state.firstImage.avatar}
              caption={this.state.firstImage.caption}
              image={this.state.firstImage.image}
              likes={this.state.firstImage.likes}
            />
          ) : null}
          {this.state.display.secondImage.forDisplay ? (
            <Post
              username={this.state.secondImage.username}
              avatar={this.state.secondImage.avatar}
              caption={this.state.secondImage.caption}
              image={this.state.secondImage.image}
              likes={this.state.secondImage.likes}
            />
          ) : null}
        </section>
      </div>
    );
  }
}

// Export
export default Home;

