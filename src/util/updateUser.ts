import endpoints from "./endpoints";
import store from "./Store";
import IUpdateUserParams from "./Interfaces";

// Multi purpose function, can be used for changing settings
// or updating user account info, recieved parameters as an object.
const updateUser = async (
  parameters: IUpdateUserParams,
  token: string = store.getState().token,
  uid: string = store.getState().uid
) => {
  console.log(parameters);
  const dataObj = {
    user: {
      email: parameters.email ? parameters.email : undefined,
      password: parameters.password ? parameters.email : undefined,
      settings: {
        syncSettings: parameters.syncSettings
          ? parameters.syncSettings
          : undefined,
        autoClipboardWrite: parameters.autoClipboardWrite
          ? parameters.autoClipboardWrite
          : undefined,
        autoClipboardRead: parameters.autoClipboardRead
          ? parameters.autoClipboardRead
          : undefined,
        clickableLinks: parameters.clickableLinks
          ? parameters.clickableLinks
          : undefined
      }
    }
  };

  const rawResponse = await fetch(endpoints.getCurrentUser + uid, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(dataObj)
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
};

export default updateUser;
