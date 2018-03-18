import React, { Component } from "react";
import { connect } from "react-redux";
import { editCommentDispatch } from "../actions/actions";
import { Link } from "react-router-dom";

class CreateComment extends Component {
  render() {
    let postCategory = this.props.postCategory;
    return (
      <div>
        <hr />
        <h4>edit comment:</h4>
        <form>
          <div className="form-group">
            <label>body</label>
            <textarea
              ref={dom => (this._body = dom)}
              defaultValue={this.props.currentComment.body}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <Link
              to={"/" + postCategory + "/" + this.props.currentComment.parentId}
              className="btn btn-success btn-sm"
              onClick={() => {
                this.props.editComment({
                  id: this.props.currentComment.id,
                  timestamp: Date.now(),
                  body: this._body.value
                });
              }}
            >
              <i className="fa fa-save" />
            </Link>
            <Link
              to={"/" + postCategory + "/" + this.props.currentComment.parentId}
              className="btn btn-warning btn-sm"
            >
              <i className="fa fa-ban" />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: data => dispatch(editCommentDispatch(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
