/* tslint:disable */
import { Component, h } from "preact";
import store from "../util/Store";
import cable from "actioncable";
import "../style/pasteInput.scss";

class Testing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  storeTest = () => {
    console.log("store: \n", store.getState());
  };

  doThing = () => {
    const temp = document.querySelector("#temp");
    async function getClipboardContents() {
      try {
        const text = await navigator.clipboard.readText();
        console.log('Pasted content: ', text);
        temp.innerHTML = "yer clipboard: " + text;
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    }
    getClipboardContents();
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <fragment>
        <button onClick={this.storeTest}>GET FROM STATE + STORE</button>
        <button onClick={this.doThing}>DO THING</button>
        <h1 id="temp"></h1>
      </fragment>
    );
  }
}

export default Testing;
