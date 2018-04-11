import * as types from "../actions/actionTypes";
import { sort } from "../API";

//init state
const initPost = {};

export default function post(state = initPost, action) {
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
