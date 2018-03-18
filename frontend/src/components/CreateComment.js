import React, { Component } from "react";
import { Link } from "react-router-dom";

const uuidv1 = require("uuid/v1");
class CreateComment extends Component {
  render() {
    let postCategory = this.props.postCategory;
    return (
      <div>
        <br />
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
            <Link
              to={"/" + postCategory + "/" + this.props.postid}
              className="btn btn-success btn-sm"
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
              <i className="fa fa-save" />
            </Link>
            <Link
              to={"/" + postCategory + "/" + this.props.postid}
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

export default CreateComment;
