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
        <div className="card-header">
          <div className="row">
            <div className="col-sm-10">
              <h2 className="card-title">{post.title}</h2>
            </div>
            <div className="col-xs-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.props.handleVote(post.id, "upVote")}
              >
                <i className="fa fa-angle-up" />
              </button>
              <span className="btn btn-primary disabled btn-sm">
                {post.voteScore}{" "}
              </span>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.props.handleVote(post.id, "downVote")}
              >
                <i className="fa fa-angle-down" />
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div>
            <h5>{post.body}</h5>
          </div>
          <div className="row">
            <div className="col-sm-4">author: {post.author}</div>
            <div className="col-sm-3">category: {post.category}</div>
            <div className="col-sm-3">publish time: {post.timestamp}</div>
            <div className="col-sm-2">
              <Link
                to={`/${post.category}/${post.id}/edit`}
                className="btn btn-primary btn-sm"
                onClick={() => {
                  this.props.handleModal(true);
                }}
              >
                <i className="fa fa-edit" />
              </Link>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => this.props.deletePost(post.id)}
              >
                <i className="fa fa-trash-alt" />
              </button>
            </div>
          </div>
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
