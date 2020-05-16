import * as createStore from "redux-zero";

const initialState = {
  email: "",
  token: "",
  uid: "",
  rooms: "",
  loggedIn: "",
  showLogin: false,
  isLive: false,
  pasteSocket: "",
  pastes: ""
};

const store = createStore(initialState);

export default store;
