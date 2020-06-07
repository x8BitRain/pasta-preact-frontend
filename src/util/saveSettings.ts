import store from "./Store";
import updateUser from "./updateUser";
import IUpdateUserParams from "./Interfaces";

const saveSettings = () => {
  const settings: IUpdateUserParams = {
    syncSettings: store.getState().syncSettings,
    autoClipboardRead: store.getState().autoClipboardRead,
    autoClipboardWrite: store.getState().autoClipboardWrite,
    clickableLinks: store.getState().clickableLinks
  };

  console.log(settings);

  localStorage.setItem("settings", JSON.stringify(settings));

  console.log(store.getState().syncSettings);

  if (store.getState().syncSettings) {
    updateUser(settings);
  }
}

export default saveSettings;
