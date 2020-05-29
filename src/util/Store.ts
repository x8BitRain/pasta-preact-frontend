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
  pastes: "",
  instaCopy: false,
  pasteInputField: null,
  readClipboard: false,
  flashMessage: false,
  messageContent: ""
};

const store = createStore(initialState);

export default store;
