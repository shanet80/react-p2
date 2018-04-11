import * as API from "../API";
import * as types from "./actionTypes";

function listCat(data) {
  return {
    type: types.LIST_CAT,
    data: data.categories
  };
}

export function changePostListOrder(order) {
  return {
    type: types.CHANGE_POST_LIST_ORDER,
    order
  };
}

function listPosts(data, orderBy) {
  return {
    type: types.LIST_POSTS,
    data: data,
    orderBy
  };
}

function listPostsByCat(data) {
  return {
    type: types.LIST_POSTS_BY_CAT,
    data
  };
}

function getPost(data) {
  return {
    type: types.GET_POST,
    data: data
  };
}

function addPost(post) {
  return {
    type: types.ADD_POST,
    post
  };
}

function deletePost(post) {
  return {
    type: types.DELETE_POST,
    post: post
  };
}

function editPost(post) {
  return {
    type: types.EDIT_POST,
    post: post
  };
}

function votePost(post) {
  return {
    type: types.VOTE_POST,
    post: post
  };
}

function listComments(data) {
  return {
    type: types.LIST_COMMENTS,
    data: data
  };
}

const addComment = data => {
  return {
    type: types.ADD_COMMENT,
    data
  };
};

function deleteComment(comment) {
  return {
    type: types.DELETE_COMMENT,
    comment: comment
  };
}

function editComment(comment) {
  return {
    type: types.EDIT_COMMENT,
    comment: comment
  };
}

function voteComment(comment) {
  return {
    type: types.VOTE_COMMENT,
    comment: comment
  };
}

export const deleteCommentDispatch = commentid => dispatch =>
  API.deleteComment(commentid).then(comment =>
    dispatch(deleteComment(comment))
  );

export const getCats = () => dispatch =>
  API.getAllCat().then(cats => dispatch(listCat(cats)));

export const getPostsByCat = cat => dispatch => {
  if (cat !== "/") {
    API.getPostsByCat(cat).then(posts => dispatch(listPostsByCat(posts, cat)));
  } else {
    API.getAllPosts().then(posts => dispatch(listPosts(posts, "voteScore")));
  }
};

export const getPosts = () => dispatch =>
  API.getAllPosts().then(posts => dispatch(listPosts(posts, "voteScore")));

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

export const postModal = isOpen => {
  return {
    type: types.POST_MODAL_VISIBLE,
    isOpen
  };
};

export const editModal = isOpen => {
  return {
    type: types.EDIT_MODAL_VISIBLE,
    isOpen
  };
};
