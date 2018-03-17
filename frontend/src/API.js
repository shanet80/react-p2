const headers = {
  Accept: "application/json",
  Authorization: "bluestonem",
  "Content-Type": "application/json"
};

export const getAllCat = () =>
  fetch("http://localhost:3001/categories", {
    headers: headers
  })
    .then(res => res.json())
    .then(data => data);

export const getAllPosts = () =>
  fetch("http://localhost:3001/posts", {
    headers: headers
  })
    .then(res => res.json())
    .then(data => data);

export const getPostsByCat = cat =>
  fetch("http://localhost:3001/" + cat + "/posts", {
    headers: headers
  })
    .then(res => res.json())
    .then(data => data);

export const getPost = id =>
  fetch("http://localhost:3001/posts/" + id, {
    headers: headers
  })
    .then(res => res.json())
    .then(data => data);

export const savePost = data =>
  fetch("http://localhost:3001/posts", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      id: data.id,
      timestamp: Date.now(),
      title: data.title,
      body: data.body,
      author: data.author,
      category: data.category
    })
  }).then(res => res.json());

export const editPost = data =>
  fetch("http://localhost:3001/posts/" + data.id, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      title: data.title,
      body: data.body
    })
  }).then(res => res.json());

export const deletePost = postid =>
  fetch("http://localhost:3001/posts/" + postid, {
    method: "DELETE",
    headers: headers
  }).then(res => res.json());

export const votePost = (postid, status) =>
  fetch("http://localhost:3001/posts/" + postid, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      option: status
    })
  }).then(res => res.json());

export const getComment = postid =>
  fetch("http://localhost:3001/posts/" + postid + "/comments", {
    headers: headers
  })
    .then(res => res.json())
    .then(data => data);

export const addComment = data =>
  fetch("http://localhost:3001/comments", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      id: data.id,
      timestamp: data.timestamp,
      body: data.body,
      author: data.author,
      parentId: data.parentId,
      deleted: false
    })
  }).then(res => res.json());

export const deleteComment = commentid =>
  fetch("http://localhost:3001/comments/" + commentid, {
    method: "DELETE",
    headers: headers
  }).then(res => res.json());

export const editComment = data =>
  fetch("http://localhost:3001/comments/" + data.id, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      timestamp: data.timestamp,
      body: data.body
    })
  }).then(res => res.json());

export const voteComment = (commentid, status) =>
  fetch("http://localhost:3001/comments/" + commentid, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      option: status
    })
  }).then(res => res.json());

// orderBy time or voteScore
export const sort = (list, by) => {
  let sortedList = [];
  if (by === "votescore") {
    sortedList = list.sort((a, b) => {
      return a.voteScore < b.voteScore;
    });
  } else {
    sortedList = list.sort((a, b) => {
      return a.timestamp < b.timestamp;
    });
  }
  return sortedList;
};
