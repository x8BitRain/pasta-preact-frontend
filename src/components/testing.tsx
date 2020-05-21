/* tslint:disable */
import { Component, h } from "preact";
import store from "../util/Store";
import cable from "actioncable";
import "../style/pasteInput.scss";

class Testing extends Component {
  constructor() {
    super();
    this.state = {
      enabled: false
    };
  }

  // develop = () => {
  //   this.setState({
  //     enabled: !this.state.enabled
  //   })
  // }

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
        <button style="position:absolute;left:0px;height:2px;width:2px;" onClick={this.storeTest}></button>
      </fragment>
    );
  }
}

export default Testing;
