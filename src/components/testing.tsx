/* tslint:disable */
import { Component, h } from "preact";
import store from "../util/Store";
//import cable from "actioncable";
import { getClipboardContents } from "../util/clipboardSync";
import "../style/pasteInput.scss";
let isProd = window.location.href.includes("app");
isProd = true;
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
    getClipboardContents();
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <fragment>
        {isProd ? null : (
          <div style="position:absolute;left:0px;height:2px;width:2px;">
            <button onClick={this.storeTest}></button>
            {/* <button onClick={this.doThing}>do thing</button> */}
          </div>
        )}
      </fragment>
    );
  }
}

export default Testing;
