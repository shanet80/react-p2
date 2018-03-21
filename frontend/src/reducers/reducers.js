import { combineReducers } from "redux";
import * as types from "../actions/actionTypes";
import { sort } from "../API";

// init State
const initCategory = {};
const initPost = {};
const initInterfaceCon = { modalIsOpen: false, editModalIsOpen: false };
const initComment = {};

function category(state = initCategory, action) {
  switch (action.type) {
    case types.LIST_CAT:
      return {
        categories: action.data
      };
    default:
      return state;
  }
}

function post(state = initPost, action) {
  switch (action.type) {
    case types.LIST_POSTS:
      return {
        posts: action.data,
        orderBy: action.orderBy
      };
    case types.LIST_POSTS_BY_CAT:
      return {
        ...state,
        posts: action.data
      };
    case types.CHANGE_POST_LIST_ORDER:
      return {
        ...state,
        posts: sort(state.posts, action.order),
        orderBy: action.order
      };
    case types.GET_POST:
      return {
        ...state,
        posts: [action.data]
      };
    case types.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.post]
      };
    case types.DELETE_POST:
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
    case types.EDIT_POST:
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
    case types.VOTE_POST:
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
    case types.LIST_COMMENTS:
      return {
        comment: action.data
      };
    case types.ADD_COMMENT:
      return {
        ...state,
        comment: [...state.comment, action.data]
      };
    case types.DELETE_COMMENT:
      return {
        ...state,
        comment: state.comment.filter(
          comment => comment.id !== action.comment.id
        )
      };
    case types.EDIT_COMMENT:
      return {
        ...state,
        comment: state.comment.map(
          comment =>
            comment.id === action.comment.id ? action.comment : comment
        )
      };
    case types.VOTE_COMMENT:
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
    case types.POST_MODAL_VISIBLE:
      return {
        modalIsOpen: action.isOpen
      };
    case types.EDIT_MODAL_VISIBLE:
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
