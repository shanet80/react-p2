import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import {
  editPostDispatch,
  editModal,
  getPostDispatch
} from "../actions/actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class EditPost extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.postid);
  }

  render() {
    if (!this.props.post.posts) return <h4>nothing</h4>;
    if (this.props.match.params.postid !== this.props.post.posts[0].id) {
      return <h4>nothing</h4>;
    }
    let post = this.props.post.posts[0];
    return (
      <Modal
        isOpen={this.props.interfaceCon.editModalIsOpen}
        style={customStyles}
      >
        <h2>edit post</h2>
        <form>
          <div className="form-group">
            <label>title</label>
            <input
              ref={dom => (this._title = dom)}
              defaultValue={post.title}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>body</label>
            <textarea
              ref={dom => (this._body = dom)}
              defaultValue={post.body}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.props.editPost({
                  id: post.id,
                  title: this._title.value,
                  body: this._body.value
                });
                this.props.handleModal(false);
              }}
            >
              save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => this.props.handleModal(false)}
            >
              close
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    handleModal: isOpen => dispatch(editModal(isOpen)),
    editPost: data => dispatch(editPostDispatch(data)),
    getPost: postid => dispatch(getPostDispatch(postid))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
