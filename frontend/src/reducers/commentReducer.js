import * as types from "../actions/actionTypes";

// init state
const initComment = {};

export default function comment(state = initComment, action) {
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
