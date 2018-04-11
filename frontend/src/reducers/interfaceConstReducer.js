import * as types from "../actions/actionTypes";

// init State
const initInterfaceConst = { modalIsOpen: false, editModalIsOpen: false };

export default function interfaceConst(state = initInterfaceConst, action) {
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
