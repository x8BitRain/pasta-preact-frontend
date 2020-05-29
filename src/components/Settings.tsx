import { Connect } from "redux-zero/preact";
import { Component, h, Fragment } from "preact";
import store from "../util/Store";
import "../style/settings.scss";
import { getClipboardPermission } from "../util/clipboardSync";

// const mapToProps = ({ loggedIn, isLive, wroteIncomingPaste }) => ({
//   loggedIn,
//   isLive,
//   wroteIncomingPaste
// });

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  enableInstaCopy = () => {
    store.setState({
      instaCopy: !store.getState().instaCopy
    });
    console.log("instaCopy is ", store.getState().instaCopy);
  };

  enableClipboardRead = () => {
    (async () => {
      await store.setState({
        readClipboard: !store.getState().readClipboard
      });
    })();
    if (store.getState().readClipboard) {
      getClipboardPermission();
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <div id="settings">
        <input
          type="checkbox"
          name="instaCopy"
          onChange={this.enableInstaCopy}
        />
        <label htmlFor="instaCopy">
          Write to clipboard on recieving paste.
        </label>
        <br />
        <br />
        <input
          type="checkbox"
          name="clipboardRead"
          onChange={this.enableClipboardRead}
        />
        <label htmlFor="clipboardRead">
          Read from clipboard when focusing Pasta.
        </label>
      </div>
    );
  }
}

export default Settings;

// <Connect mapToProps={mapToProps}>
// {({  }) => (

// )}
// </Connect>
