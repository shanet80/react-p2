import React, { Component } from "react";
import { connect } from "react-redux";
import { editCommentDispatch } from "../actions/actions";

class CreateComment extends Component {
  render() {
    return (
      <div>
        <h2>edit comment</h2>
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
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => {
                this.props.editComment({
                  id: this.props.currentComment.id,
                  timestamp: Date.now(),
                  body: this._body.value
                });
              }}
            >
              Save
            </button>
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
