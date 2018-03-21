import React from "react";

function ChangeOrder(props) {
  let order =
    props.props.post.posts === undefined
      ? "time"
      : props.props.post.posts.orderBy;
  return (
    <div className="col-sm-4">
      <select
        className="form-control"
        value={order}
        onChange={e => {
          props.props.changeOrder(e.target.value);
        }}
      >
        <option value="votescore">Order By VoteScore</option>
        <option value="time">Order By Time</option>
      </select>
    </div>
  );
}

export default ChangeOrder;
