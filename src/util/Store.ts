import * as createStore from "redux-zero";

const initialState = {
  email: "",
  token: ""
};

const store = createStore(initialState);

export default store;
