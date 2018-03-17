import React, { Component } from "react";

const uuidv1 = require("uuid/v1");
class CreateComment extends Component {
  render() {
    return (
      <div>
        <h2>add comment</h2>
        <form>
          <div className="form-group">
            <label>author</label>
            <input ref={dom => (this._author = dom)} className="form-control" />
          </div>
          <div className="form-group">
            <label>body</label>
            <textarea
              ref={dom => (this._body = dom)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => {
                const uuid = uuidv1();
                this.props.handle({
                  id: uuid,
                  timestamp: Date.now(),
                  body: this._body.value,
                  author: this._author.value,
                  parentId: this.props.postid
                });
              }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateComment;
