import { combineReducers } from "redux";
import {
  LIST_CAT,
  LIST_POSTS,
  CHANGE_POST_LIST_ORDER,
  LIST_POSTS_BY_CAT,
  POST_MODAL_VISIBLE,
  EDIT_MODAL_VISIBLE,
  ADD_POST,
  GET_POST,
  DELETE_POST,
  EDIT_POST,
  LIST_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_POST,
  VOTE_COMMENT
} from "../actions/actions";
import { sort } from "../API";

// init State
const initCategory = {};
const initPost = {};
const initInterfaceCon = { modalIsOpen: false, editModalIsOpen: false };
const initComment = {};

function category(state = initCategory, action) {
  switch (action.type) {
    case LIST_CAT:
      return {
        categories: action.data
      };
    default:
      return state;
  }
}

function post(state = initPost, action) {
  switch (action.type) {
    case LIST_POSTS:
      return {
        posts: action.data,
        orderBy: action.orderBy
      };
    case LIST_POSTS_BY_CAT:
      return {
        ...state,
        posts: action.data
      };
    case CHANGE_POST_LIST_ORDER:
      return {
        ...state,
        posts: sort(state.posts, action.order),
        orderBy: action.order
      };
    case GET_POST:
      return {
        ...state,
        posts: [action.data]
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.post]
      };
    case DELETE_POST:
      if (Array.isArray(state.posts)) {
        return {
          ...state,
          posts: state.posts.filter(post => post.id !== action.post.id)
        };
      } else {
        return {
          ...state,
          posts: ""
        };
      }
    case EDIT_POST:
      if (Array.isArray(state.posts)) {
        return {
          ...state,
          posts: [
            ...state.posts.filter(post => post.id !== action.post.id),
            action.post
          ]
        };
      } else {
        return {
          ...state,
          posts: action.post
        };
      }
    case VOTE_POST:
      if (Array.isArray(state.posts)) {
        return {
          ...state,
          posts: state.posts.map(
            post => (post.id === action.post.id ? action.post : post)
          )
        };
      } else {
        return {
          ...state,
          posts: action.post
        };
      }
    default:
      return state;
  }
}

function comment(state = initComment, action) {
  switch (action.type) {
    case LIST_COMMENTS:
      return {
        comment: action.data
      };
    case ADD_COMMENT:
      return {
        ...state,
        comment: [...state.comment, action.data]
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comment: state.comment.filter(
          comment => comment.id !== action.comment.id
        )
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comment: state.comment.map(
          comment =>
            comment.id === action.comment.id ? action.comment : comment
        )
      };
    case VOTE_COMMENT:
      return {
        ...state,
        comment: state.comment.map(
          comment =>
            comment.id === action.comment.id ? action.comment : comment
        )
      };
    default:
      return state;
  }
}

function interfaceCon(state = initInterfaceCon, action) {
  switch (action.type) {
    case POST_MODAL_VISIBLE:
      return {
        modalIsOpen: action.isOpen
      };
    case EDIT_MODAL_VISIBLE:
      return {
        editModalIsOpen: action.isOpen
      };
    default:
      return state;
  }
}

export default combineReducers({
  category,
  post,
  comment,
  interfaceCon
});
