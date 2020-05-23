/* eslint-disable */
import { Component, h, Fragment } from "preact";
import { Provider } from 'redux-zero/preact';
import Slideout from "slideout";
import "../style/sidePanel.scss";
import store from '../util/Store';
import Navbar from "./Navbar";
import PasteInput from './PasteInput';
import PasteList from "./PasteList";
import Settings from "./Settings";
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
    const slideout = new Slideout({
      panel: document.getElementById("app"),
      menu: document.getElementById("side-panel"),
      padding: 256,
      tolerance: 70
    });
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Provider store={store}>
        <Fragment>
        <div id="app">
          <Navbar/>
          <Login onLoginSuccess={this.handleLogin}/>
          <Testing />
          <div id="main-container">
            <PasteList />
            <div id="pusher">
              <PasteInput/>
            </div>
          </div>
        </div>
        <div id="side-panel">
          <Settings />
        </div>
        </Fragment>
      </Provider>
    );
  }
};

export default App;
