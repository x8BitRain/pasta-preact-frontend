/* eslint-disable */
import { Component, h } from "preact";
import store from '../util/Store';
import PasteSocket from '../util/Websocket'
import '../style/pasteInput.scss';
let pasteInputValue = "";
class PasteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pasteSocket: undefined
    };
    this.sendPasteManual = this.sendPasteManual.bind(this);
    this.handlePasteInput = this.handlePasteInput.bind(this);
    this.doThing = this.doThing.bind(this)
  }

  
  checkWebsocketInstance = (data) => {
    if (this.state.pasteSocket === undefined) {
      this.setState({
        pasteSocket: store.getState().pasteSocket
      }, () => {
        this.state.pasteSocket.send(data);
      })
    } else {
      this.state.pasteSocket.send(data);
    }
  }
  
  doThing() {
    console.log(this.checkWebsocketInstance()); 
  }

  sendPasteManual = (event) => {
    event ? event.preventDefault() : null;
    this.checkWebsocketInstance(pasteInputValue)
  }

  sendPastePaste = (event) => {
    event ? event.preventDefault() : null;
    this.checkWebsocketInstance(pasteInputValue)
  }
  
  handlePasteInput(e) {
    e.preventDefault();
    pasteInputValue = e.target.value;
    console.log(pasteInputValue);
    //e.stopPropagation();
    //console.log(e);
    switch (e.type) {
      case "submit":
        this.sendPasteManual();
      break;
      case "input":
        e.inputType === "insertFromPaste" ? this.sendPastePaste() : null;
      break;
      case "paste":
        this.sendPastePaste();
      break;
        default:
          console.log("what");
      }
  }


  
  componentDidMount() {
    // const pasteInput = document.querySelector("#pasteInput");
    // pasteInput.addEventListener('paste', (event) => {
    //   let paste = (event.clipboardData || window.clipboardData).getData('text');
    //   console.log(paste);
    // });
  }
  
  componentWillUnmount() {}

  // INSTANTIATE PASTESOCKET AND STORE IN STATE IF NOT YET DONE



  render() {
    return (
      <form onSubmit={this.handlePasteInput}>
        <div id="paste-input">
          <input
            id="pasteInput"
            onInput={this.handlePasteInput} 
            type="text"
          />
          <button onclick={this.sendPasteManual}>Paste</button>
          <button onclick={this.doThing}>do thing</button>
        </div>
      </form>
    );
  }
};

export default PasteInput;