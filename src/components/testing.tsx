/* tslint:disable */
import { Component, h } from "preact";
import store from "../util/Store";
import cable from "actioncable";
import "../style/pasteInput.scss";

class Testing extends Component {
  constructor() {
    super();
    this.state = {
      uid: "cf76822f-b97f-4946-8bfe-84ced8717e2b",
      token:
        "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY2Y3NjgyMmYtYjk3Zi00OTQ2LThiZmUtODRjZWQ4NzE3ZTJiIiwiZXhwIjoxNTg5NTYwODE5fQ.4hLeyM4DlhEamoGJTulyhEfM6MijqQHcOF51UQSCKsk",
      pasteText: "",
      pastes: []
    };
    this.socket = cable.createConsumer(
      `ws://localhost:3334/live?uid=${this.state.uid}&token=${this.state.token}`
    );
  }

  storeTest = () => {
    console.log("store: \n", store.getState());
    console.log("state: \n", this.state);
  };

  subscribeConsumer = () => {
    this.consumer = this.socket.subscriptions.create(
      {
        channel: "PasteChannel",
        room_id: "9a446ad3-1c34-43f2-9f93-dcd74de5059c"
      },
      {
        connected: function() {
          console.log("connected!");
        },
        disconnected: function() {
          console.log("disconnected!");
        },
        received: data => {
          console.log("connected!", data);
          this.setState({
            pastes: [
              ...this.state.pastes,
              [data.content.content, data.content.created_at]
            ]
          });
        }
      }
    );
  };

  makePaste = () => {
    const pasteParams = {
      command: "message",
      action: "create",
      data: {
        content: this.state.pasteText,
        content_type: "string",
        device: "nexus6p"
      }
    };
    this.consumer.send(pasteParams);
  };

  handlePaste = event => {
    this.setState({
      pasteText: event.target.value
    });
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <fragment>
        <button onClick={this.subscribeConsumer}>SUBSCRIBE</button>
        <button onClick={this.makePaste}>MAKE PASTE</button>
        <button onClick={this.storeTest}>GET FROM STATE + STORE</button>
        <div id="paste-input">
          <ul>
            {this.state.pastes.map((value, index) => (
              <li key={index}>
                {value[0]} - {value[1]}
              </li>
            ))}
          </ul>
          <input onInput={this.handlePaste} type="text" />
          <button onClick={this.makePaste}>Paste</button>
        </div>
      </fragment>
    );
  }
}

export default Testing;
