import copy from "clipboard-copy";
import flashMessage from "./flashMessage";

const getClipboardPermission = async () => {
  try {
    await navigator.clipboard.readText();
    flashMessage({
      content: "Clipboard access granted",
      type: true,
      delay: 2000
    });
  } catch (err) {
    flashMessage({
      content: "Couldn't get clipboard access",
      type: false,
      delay: 2000
    });
  }
};

const getClipboardContents = async () => {
  try {
    const text = await navigator.clipboard.readText();
    flashMessage({
      content: "Read from clipboard",
      type: true,
      delay: 2000
    });
    return text;
  } catch (err) {
    flashMessage({
      content: "Could not from clipboard",
      type: false,
      delay: 2000
    });
    console.error("Failed to read clipboard contents: ", err);
  }
};

const clipboardWrite = async data => {
  copy(data)
    .then(async () => {
      console.log("copied!");
      flashMessage({
        content: "Copied to clipboard",
        type: true,
        delay: 2000
      });
    })
    .catch(error => {
      console.log("Copy failed", error);
    });
};

export { getClipboardContents, clipboardWrite, getClipboardPermission };
