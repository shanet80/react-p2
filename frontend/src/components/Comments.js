import React, { Component, Fragment } from "react";
import { withRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";
import {
  addCommentsDispatch,
  deleteCommentDispatch,
  voteCommentDispath
} from "../actions/actions";

class Comments extends Component {
  render() {
    let comment = this.props.comment.comment;
    let postCategory = this.props.postCategory;
    return (
      <Fragment>
        <hr />
        <h4>Comments: </h4>
        <br />
        <ul>
          {(comment || []).map((comment, index) => (
            <li className="list-unstyled" key={index}>
              <div className="row">
                <div className="col-sm-10">
                  <h6>{comment.body}</h6>
                </div>
                <div className="col-sm-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => this.props.handleVote(comment.id, "upVote")}
                  >
                    <i className="fa fa-angle-up" />
                  </button>
                  <span className="btn btn-primary disabled btn-sm">
                    {comment.voteScore}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      this.props.handleVote(comment.id, "downVote")
                    }
                  >
                    <i className="fa fa-angle-down" />
                  </button>
                </div>
              </div>
              <Link
                className="btn btn-primary btn-sm"
                to={
                  "/" +
                  postCategory +
                  "/" +
                  this.props.match.params.postid +
                  "/" +
                  comment.id +
                  "/" +
                  "editComment"
                }
              >
                <i className="fa fa-edit" />
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.props.deleteComment(comment.id)}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <div>author: {comment.author}</div>
              <Route
                exact
                path={
                  "/" +
                  postCategory +
                  "/" +
                  this.props.match.params.postid +
                  "/" +
                  comment.id +
                  "/" +
                  "editComment"
                }
                render={() => (
                  <EditComment
                    currentComment={comment}
                    postCategory={postCategory}
                  />
                )}
              />
              <hr />
            </li>
          ))}
        </ul>
        <div>
          <Link
            to={
              "/" +
              postCategory +
              "/" +
              this.props.match.params.postid +
              "/createComment"
            }
            className="btn btn-primary"
          >
            Create Comment
          </Link>
          <Route
            exact
            path={
              "/" +
              this.props.match.params.cat +
              "/" +
              this.props.match.params.postid +
              "/createComment"
            }
            render={props => (
              <CreateComment
                handle={this.props.addComment}
                postid={this.props.match.params.postid}
                postCategory={postCategory}
              />
            )}
          />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: data => dispatch(addCommentsDispatch(data)),
    deleteComment: data => dispatch(deleteCommentDispatch(data)),
    handleVote: (commentid, status) =>
      dispatch(voteCommentDispath(commentid, status))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comments)
);
