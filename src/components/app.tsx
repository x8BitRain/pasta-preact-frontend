/* eslint-disable */
import { Component, h } from "preact";
import { Provider } from 'redux-zero/preact';
import store from '../util/Store';
import Navbar from "./Navbar";
import PasteInput from './PasteInput';
import PasteList from "./PasteList";
import Testing from "./testing";
import Login from "./Login";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug");
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogin = (e) => {
    // Change stuff in here when logged in successfully
    console.log(e)
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Navbar/>
          <Login onLoginSuccess={this.handleLogin}/>
          <Testing />
          <PasteList />
          <PasteInput/>
        </div>
      </Provider>
    );
  }
};

export default App;
