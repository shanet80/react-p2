import * as API from "../API";
export const LIST_CAT = "LIST_CAT";

export const LIST_POSTS = "LIST_POSTS";
export const LIST_POSTS_BY_CAT = "LIST_POSTS_BY_CAT";
export const CHANGE_POST_LIST_ORDER = "CHANGE_POST_LIST_ORDER";
export const ADD_POST = "ADD_POST";
export const GET_POST = "GET_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const VOTE_POST = "VOTE_POST";

export const LIST_COMMENTS = "LIST_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";

export const POST_MODAL_VISIBLE = "POST_MODAL_VISIBLE";
export const EDIT_MODAL_VISIBLE = "EDIT_MODAL_VISIBLE";

function listCat(data) {
  return {
    type: LIST_CAT,
    data: data.categories
  };
}

export function changePostListOrder(order) {
  return {
    type: CHANGE_POST_LIST_ORDER,
    order
  };
}

function listPosts(data, orderBy) {
  return {
    type: LIST_POSTS,
    data: data,
    orderBy
  };
}

function getPost(data) {
  return {
    type: GET_POST,
    data: data
  };
}

function listPostsByCat(data) {
  return {
    type: LIST_POSTS_BY_CAT,
    data
  };
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

function deletePost(post) {
  return {
    type: DELETE_POST,
    post: post
  };
}

function editPost(post) {
  return {
    type: EDIT_POST,
    post: post
  };
}

function votePost(post) {
  return {
    type: VOTE_POST,
    post: post
  };
}

function listComments(data) {
  return {
    type: LIST_COMMENTS,
    data: data
  };
}

const addComment = data => {
  return {
    type: ADD_COMMENT,
    data
  };
};

function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment: comment
  };
}

function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment: comment
  };
}

function voteComment(comment) {
  return {
    type: VOTE_COMMENT,
    comment: comment
  };
}

export const deleteCommentDispatch = commentid => dispatch =>
  API.deleteComment(commentid).then(comment =>
    dispatch(deleteComment(comment))
  );

export const postModal = isOpen => {
  return {
    type: POST_MODAL_VISIBLE,
    isOpen
  };
};

export const editModal = isOpen => {
  return {
    type: EDIT_MODAL_VISIBLE,
    isOpen
  };
};

export const getCats = () => dispatch =>
  API.getAllCat().then(cats => dispatch(listCat(cats)));

export const getPosts = () => dispatch =>
  API.getAllPosts().then(posts => dispatch(listPosts(posts, "voteScore")));

export const getPostsByCat = cat => dispatch => {
  if (cat !== "/") {
    API.getPostsByCat(cat).then(posts => dispatch(listPostsByCat(posts, cat)));
  } else {
    API.getAllPosts().then(posts => dispatch(listPosts(posts, "voteScore")));
  }
};

export const getPostDispatch = postid => dispatch =>
  API.getPost(postid).then(post => dispatch(getPost(post)));

export const savePost = data => dispatch =>
  API.savePost(data).then(id => dispatch(addPost(id)));

export const deletePostDispatch = postid => dispatch =>
  API.deletePost(postid).then(postid => dispatch(deletePost(postid)));

export const editPostDispatch = post => dispatch => {
  API.editPost(post).then(post => dispatch(editPost(post)));
};

export const votePostDispath = (postid, status) => dispatch => {
  API.votePost(postid, status).then(post => dispatch(votePost(post)));
};

export const listCommentsDispatch = postid => dispatch =>
  API.getComment(postid).then(comments => dispatch(listComments(comments)));

export const addCommentsDispatch = data => dispatch =>
  API.addComment(data).then(data => dispatch(addComment(data)));

export const editCommentDispatch = comment => dispatch => {
  API.editComment(comment).then(comment => dispatch(editComment(comment)));
};

export const voteCommentDispath = (commentid, status) => dispatch => {
  API.voteComment(commentid, status).then(comment =>
    dispatch(voteComment(comment))
  );
};
