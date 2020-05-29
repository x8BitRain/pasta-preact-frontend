/* eslint-disable */
import { Component, h, createRef } from "preact";
import store from '../util/Store';
import PasteSocket from '../util/Websocket';
import '../style/pasteInput.scss';
let pasteInputValue = "";
class PasteInput extends Component {
  pasteInput = createRef();
  constructor(props) {
    super(props);
    this.state = {
      pasteSocket: undefined,
    };
    this.sendPasteManual = this.sendPasteManual.bind(this);
    this.handlePasteInput = this.handlePasteInput.bind(this);
    this.doThing = this.doThing.bind(this)
  }

  clearInput = () => {
    this.pasteInput.current.value = '';
    pasteInputValue = '';
  }
  
  checkWebsocketInstance = (data) => {
    if (this.state.pasteSocket === undefined) {
      this.setState({
        pasteSocket: store.getState().pasteSocket
      }, () => {
        data !== '' ? this.state.pasteSocket.send(data) : console.log('no empty pastes pls');
        this.clearInput();
      })
    } else {
      data !== '' ? this.state.pasteSocket.send(data) : console.log('no empty pastes pls');
      this.clearInput();
    }
  }
  
  doThing() {
    console.log(this.checkWebsocketInstance()); 
  }

  sendPasteManual = (event) => {
    event ? event.preventDefault() : null;
    this.checkWebsocketInstance(pasteInputValue || this.pasteInput.current.value)
  }

  sendPastePaste = (event) => {
    event ? event.preventDefault() : null;
    this.checkWebsocketInstance(pasteInputValue)
  }
  
  handlePasteInput(e) {
    e.preventDefault();
    pasteInputValue = e.target.value;
    switch (e.type) {
      case "submit":
        this.sendPasteManual();
      break;
      case "input":
        if (e.inputType === "insertFromPaste") {
          this.sendPastePaste();
          console.log(this.pasteInput);
        }
      break;
      case "paste":
        this.sendPastePaste();
      break;
        default:
          console.log("what");
      }
  }

  componentDidMount() {
    store.setState({
      pasteInputField: this.pasteInput.current
    });
  }
  
  componentWillUnmount() {}

  render() {
    return (
      <form onSubmit={this.handlePasteInput}>
        <div id="paste-input">
          <input
            id="pasteInput"
            onInput={this.handlePasteInput}
            ref={this.pasteInput}
            type="text"
            autoFocus
          />
          <button onClick={this.sendPasteManual}>Paste</button>
          {/* <button onClick={this.doThing}>do thing</button> */}
        </div>
      </form>
    );
  }
};

export default PasteInput;