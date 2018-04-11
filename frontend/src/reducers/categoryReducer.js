import * as types from "../actions/actionTypes";

//init state
const initCategory = {};

export default function category(state = initCategory, action) {
  switch (action.type) {
    case types.LIST_CAT:
      return {
        categories: action.data
      };
    default:
      return state;
  }
}
