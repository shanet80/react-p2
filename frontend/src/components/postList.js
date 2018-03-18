import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePostDispatch,
  editModal,
  votePostDispath,
  getPostDispatch,
  getPostsByCat
} from "../actions/actions";
class PostList extends Component {
  componentDidMount() {
    let cat =
      this.props.match.params.cat === "" ? this.props.match.params.cat : "/";
    this.props.listPosts(cat);
  }
  render() {
    let post = this.props.post.posts;
    if (!post) {
      return <div>show nothing.</div>;
    }
    return (
      <div>
        <br />
        {post.map((post, index) => (
          <div key={index}>
            <div className="row">
              <div className="col-sm-2">
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
              <div className="col-sm-8">
                <Link to={`/${post.category}/${post.id}`}>
                  <h4>title: {post.title}</h4>
                </Link>
              </div>
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
            <br />
            <div className="row">
              <div className="col-sm-10">
                <span>author: {post.author}</span>
              </div>
              <div className="col-sm-2">
                <span>commentCount: {post.commentCount} </span>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: postid => dispatch(deletePostDispatch(postid)),
    handleModal: isOpen => dispatch(editModal(isOpen)),
    handleVote: (postid, status) => dispatch(votePostDispath(postid, status)),
    getPost: postid => dispatch(getPostDispatch(postid)),
    listPosts: cat => dispatch(getPostsByCat(cat))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
