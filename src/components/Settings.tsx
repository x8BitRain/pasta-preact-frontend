import { Connect } from "redux-zero/preact";
import { Component, h, Fragment } from "preact";
import store from "../util/Store";
import Switch from "./small/Switch";
import saveSettings from "../util/saveSettings";
import camelize from "../util/camelizer";
import "../style/settings.scss";
import { getClipboardPermission } from "../util/clipboardSync";

const mapToProps = ({
  loggedIn,
  autoClipboardRead,
  autoClipboardWrite,
  clickableLinks,
  syncSettings
}) => ({
  loggedIn,
  autoClipboardRead,
  autoClipboardWrite,
  clickableLinks,
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

  enableClickableLinks = () => {
    (async () => {
      await store.setState({
        clickableLinks: !store.getState().clickableLinks
      });
    })();
    saveSettings();
  };

  expandOption = (e: MouseEvent | string) => {
    console.log(e);
    const target = e.currentTarget ? e.currentTarget.dataset.settingsId : e;
    const growDiv = document.getElementById(target);
    if (growDiv.clientHeight) {
      growDiv.style.height = "0px";
      growDiv.style.marginBottom = "0px";
    } else {
      const wrapper = document.querySelector(`#${target} > .measuringWrapper`);
      growDiv.style.height = wrapper.clientHeight + "px";
      growDiv.style.marginBottom = "10px";
    }
  };

  componentDidMount() {
    this.expandOption("paste-settings");
    this.expandOption("app-settings");
  }

  componentWillUnmount() {}

  render() {
    return (
      <Connect mapToProps={mapToProps}>
        {({
          loggedIn,
          autoClipboardRead,
          autoClipboardWrite,
          clickableLinks,
          syncSettings
        }) => (
          <div id="settings">
            <div class="settings-category">
              <div
                data-settings-id="paste-settings"
                onClick={this.expandOption}
                class="btn-img"
              >
                <img src="../assets/icons/clipboard-white.svg" alt="" />
                <button id="paste-settings-btn">Paste Settings</button>
              </div>
              <div id="paste-settings" class="settings-category-content">
                <div class="measuringWrapper">
                  <Switch
                    isOn={autoClipboardWrite}
                    handleToggle={this.enableInstaCopy}
                    text={"Auto Clipboard Write"}
                  />
                  <Switch
                    isOn={autoClipboardRead}
                    handleToggle={this.enableClipboardRead}
                    text={"Auto Clipboard Read"}
                  />
                </div>
              </div>
            </div>
            {/* APP SETTINGS */}
            <div class="settings-category">
              <div
                data-settings-id="app-settings"
                onClick={this.expandOption}
                class="btn-img"
              >
                <img src="../assets/icons/cog.svg" alt="" />
                <button id="paste-settings-btn">App Settings</button>
              </div>
              <div id="app-settings" class="settings-category-content">
                <div class="measuringWrapper">
                  <Switch
                    isOn={syncSettings}
                    handleToggle={this.enableSettingsSync}
                    text={"Sync Settings"}
                  />
                  <Switch
                    isOn={clickableLinks}
                    handleToggle={this.enableClickableLinks}
                    text={"Make links clickable"}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Connect>
    );
  }
}

export default Settings;
