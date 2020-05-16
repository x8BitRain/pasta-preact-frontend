import * as createStore from "redux-zero";

const initialState = {
  email: "",
  token: "",
  uid: "",
  rooms: "",
  loggedIn: "",
  pasteSocket: "",
  pastes: []
};

const store = createStore(initialState);

export default store;
