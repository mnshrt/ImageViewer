// Imports
import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Comment from "./Comment";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import "./Post.css";

// Post component
class Post extends Component {
  constructor(props) {
    super(props);
    this.createComment = this.createComment.bind(this);
    this.likePicture = this.likePicture.bind(this);
    this.unlikePicture = this.unlikePicture.bind(this);
  }

  state = {
    comment: [],
    user: undefined,
    showFavorite: false,
    likeBool: false,
    decrementBool: false
  };

  componentDidMount() {
    this.setState({
      likes: this.props.likes
    });
    console.log(this.state.likes);
  }

  createComment(e) {
    e.preventDefault();
    const newArray = this.state.comment.slice(0);
    const newComment = e.target.elements.comment.value;
    newArray.splice(0, 0, newComment);
    console.log(newComment);
    const userName = this.props.username + ": ";
    if (newComment !== undefined) {
      this.setState({
        comment: newArray
      });
    }
  }

  likePicture = () => {
    console.log(this.state.likeCount);
    this.setState({
      showFavorite: true,
      likeBool: true,
      decrementBool: false
    });
  };

  unlikePicture = () => {
    this.setState({
      showFavorite: false,
      decrementBool: true,
      likeBool: false
    });
  };

  render() {
    const username = this.props.username;
    const avatar = this.props.avatar;
    const image = this.props.image;
    const caption = this.props.caption;
    const likes = this.props.likes;
    let finalLikes;
    console.log(finalLikes);
    if (this.state.likeBool) {
      finalLikes = likes;
      finalLikes = finalLikes + 1;
    }
    if (this.state.decrementBool) {
      finalLikes = finalLikes - 1;
    }
    let commentList = [];
    if (this.state.comment.length) {
      commentList = this.state.comment.map(comment => {
        return <Comment comment={comment} user={username} />;
      });
    }
    return (
      <Card className="card-container">
        <div className="post-container">
          <div className="Post" ref="post">
            <header>
              <div className="Post-user">
                <div className="Post-user-avatar">
                  <img src={avatar} alt={username} />
                </div>
                <div className="Post-user-nickname">
                  <span>{username}</span>
                  <br />
                  <span id="date">03/02/2018 16:11:33</span>
                </div>
              </div>
            </header>
            <div className="Post-image">
              <div className="Post-image-bg">
                <img src={image} alt={caption} />
              </div>
            </div>
            <hr />
            <div className="Post-caption">{caption}</div>
            <div className="likes" style={{ display: "inline - flex" }}>
              {!this.state.showFavorite ? (
                <FavoriteBorder
                  onClick={event => {
                    this.likePicture();
                  }}
                />
              ) : (
                <Favorite
                  style={{ color: "red" }}
                  onClick={this.unlikePicture}
                />
              )}
              {!this.state.likeBool || this.state.decrementBool ? (
                <span id="likeCount"> {likes} likes </span>
              ) : (
                <span id="likeCount"> {finalLikes} likes </span>
              )}
            </div>
            <br />
            {commentList}
            <FormControl>
              <form onSubmit={this.createComment}>
                <div className="comment-component">
                  <div>
                    <InputLabel variant="standard" htmlFor="comment">
                      Add a comment
                    </InputLabel>
                    <Input
                      className="comment-textfield"
                      id="standard-with-placeholder"
                      name="comment"
                      label="Add a comment"
                      placeholder="Add a comment"
                      style={{ marginRight: " 200px" }}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                    className="comment-btn"
                  >
                    <strong>Add</strong>
                  </Button>
                </div>
              </form>
            </FormControl>
          </div>
        </div>
      </Card>
    );
  }
}

// Export
export default Post;
