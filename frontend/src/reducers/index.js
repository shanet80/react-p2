import { combineReducers } from "redux";
import category from "./categoryReducer";
import post from "./postReducder";
import comment from "./commentReducer";
import interfaceConst from "./interfaceConstReducer";

export default combineReducers({
  category,
  post,
  comment,
  interfaceConst
});
