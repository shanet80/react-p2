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
    return (
      <Fragment>
        <h4>Comments</h4>
        <ul>
          {(comment || []).map((comment, index) => (
            <li className="list-unstyled" key={index}>
              <h4>author: {comment.author}</h4>
              <span>voteScore: {comment.voteScore}</span>
              <Link
                className="btn btn-outline-primary btn-sm"
                to={
                  "/" +
                  this.props.match.params.cat +
                  "/" +
                  this.props.match.params.postid +
                  "/" +
                  comment.id +
                  "/" +
                  "editComment"
                }
              >
                EditComment
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => this.props.deleteComment(comment.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => this.props.handleVote(comment.id, "upVote")}
              >
                upVote
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => this.props.handleVote(comment.id, "downVote")}
              >
                downVote
              </button>
              <div>{comment.body}</div>
              <Route
                exact
                path={
                  "/" +
                  this.props.match.params.cat +
                  "/" +
                  this.props.match.params.postid +
                  "/" +
                  comment.id +
                  "/" +
                  "editComment"
                }
                render={() => <EditComment currentComment={comment} />}
              />
            </li>
          ))}
        </ul>
        <div>
          <Link
            to={
              "/" +
              this.props.match.params.cat +
              "/" +
              this.props.match.params.postid +
              "/createComment"
            }
          >
            CreateComment
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
