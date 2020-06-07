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
  autoClipboardRead: false,
  autoClipboardWrite: false,
  syncSettings: false,
  clickableLinks: false,
  pasteInputField: null,
  flashMessage: false,
  messageContent: ""
};

const store = createStore(initialState);

export default store;
