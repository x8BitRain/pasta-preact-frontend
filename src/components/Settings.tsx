import { Connect } from "redux-zero/preact";
import { Component, h, Fragment } from "preact";
import store from "../util/Store";
import saveSettings from "../util/saveSettings";
import "../style/settings.scss";
import { getClipboardPermission } from "../util/clipboardSync";

const mapToProps = ({
  loggedIn,
  autoClipboardRead,
  autoClipboardWrite,
  syncSettings
}) => ({
  loggedIn,
  autoClipboardRead,
  autoClipboardWrite,
  syncSettings
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  enableSettingsSync = () => {
    store.setState({
      syncSettings: !store.getState().syncSettings
    });
    saveSettings();
  };

  enableInstaCopy = () => {
    store.setState({
      autoClipboardWrite: !store.getState().autoClipboardWrite
    });
    // console.log("autoClipboardWrite is ", store.getState().autoClipboardWrite);
    saveSettings();
  };

  enableClipboardRead = () => {
    (async () => {
      await store.setState({
        autoClipboardRead: !store.getState().autoClipboardRead
      });
    })();
    // console.log(store.getState().autoClipboardRead);
    if (store.getState().autoClipboardRead) {
      getClipboardPermission();
    }
    saveSettings();
  };

  componentWillUnmount() {}

  render() {
    return (
      <Connect mapToProps={mapToProps}>
        {({
          loggedIn,
          autoClipboardRead,
          autoClipboardWrite,
          syncSettings
        }) => (
          <div id="settings">
            <input
              type="checkbox"
              name="autoClipboardWrite"
              checked={autoClipboardWrite}
              onChange={this.enableInstaCopy}
            />
            <label htmlFor="autoClipboardWrite">
              Write to clipboard on recieving paste.
            </label>
            <br />
            <br />
            <input
              type="checkbox"
              name="clipboardRead"
              checked={autoClipboardRead}
              onChange={this.enableClipboardRead}
            />
            <label htmlFor="clipboardRead">
              Read from clipboard when focusing Pasta.
            </label>
            <br />
            <br />
            <input
              type="checkbox"
              name="syncSettings"
              checked={syncSettings}
              onChange={this.enableSettingsSync}
            />
            <label htmlFor="syncSettings">Sync settings to other devices</label>
          </div>
        )}
      </Connect>
    );
  }
}

export default Settings;
