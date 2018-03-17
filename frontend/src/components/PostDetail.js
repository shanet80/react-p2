import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  listCommentsDispatch,
  votePostDispath,
  editModal,
  deletePostDispatch,
  getPostDispatch
} from "../actions/actions";
import Comments from "./Comments";

class PostDetail extends Component {
  componentDidMount() {
    this.props.listPost(this.props.match.params.postid);
    this.props.listComment(this.props.match.params.postid);
  }

  render() {
    if (!this.props.post.posts || !this.props.post.posts[0]) {
      return <div>nothing to show.</div>;
    }
    if (this.props.match.params.postid !== this.props.post.posts[0].id) {
      return <h4>nothing</h4>;
    }
    let post = this.props.post.posts[0];
    return (
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <div>author: {post.author}</div>
          <div>category: {post.category}</div>
          <div>publish time: {post.timestamp}</div>
          <div>voteScore:{post.voteScore}</div>
          <div>
            <p>{post.body}</p>
          </div>
          <Link
            to={`/${post.category}/${post.id}/edit`}
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
              this.props.handleModal(true);
            }}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.props.deletePost(post.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => this.props.handleVote(post.id, "upVote")}
          >
            upVote
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => this.props.handleVote(post.id, "downVote")}
          >
            downVote
          </button>
          <div>
            <Comments />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    listComment: postid => dispatch(listCommentsDispatch(postid)),
    handleVote: (postid, status) => dispatch(votePostDispath(postid, status)),
    handleModal: isOpen => dispatch(editModal(isOpen)),
    deletePost: postid => dispatch(deletePostDispatch(postid)),
    listPost: cat => dispatch(getPostDispatch(cat))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);
