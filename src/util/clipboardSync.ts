import copy from "clipboard-copy";
import store from "./Store";
import delay from "./delay";

const getClipboardContents = async () => {
  try {
    const text = await navigator.clipboard.readText();
    console.log("Pasted content: ", text);
  } catch (err) {
    console.error("Failed to read clipboard contents: ", err);
  }
};

const clipboardWrite = async data => {
  copy(data)
    .then(async () => {
      console.log("copied!");
      store.setState({
        wroteIncomingPaste: true
      });
      console.log("waiting");
      await delay(2000);
      console.log("done waiting");
      store.setState({
        wroteIncomingPaste: false
      });
    })
    .catch(error => {
      console.log("Copy failed", error);
    });
};

const thingo = () => {
  console.log("thingo");
};

export { getClipboardContents, clipboardWrite };
