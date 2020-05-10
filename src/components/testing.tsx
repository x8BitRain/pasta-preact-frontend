/* tslint:disable */
import { Component, h } from "preact";
import store from "../util/Store";
import cable from "actioncable";
import "../style/pasteInput.scss";

class Testing extends Component {
  constructor() {
    super();
    this.state = {
      uid: "b9498d14-cb86-4c3c-9424-375cdfc43f52",
      token:
        "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYjk0OThkMTQtY2I4Ni00YzNjLTk0MjQtMzc1Y2RmYzQzZjUyIiwiZXhwIjoxNTg5MjA2NTE3fQ.gtlV2TXmAQTfNcxLm1I0c5feBMA_yglnq0Xocr8m3Ho",
      pasteText: "",
      pastes: []
    };
    this.socket = cable.createConsumer(
      `ws://localhost:3334/live?uid=${this.state.uid}&token=${this.state.token}`
    );
  }

  storeTest = () => {
    console.log(store.getState());
    console.log(this.state);
  };

  subscribeConsumer = () => {
    this.consumer = this.socket.subscriptions.create(
      {
        channel: "PasteChannel",
        room_id: "52c923b1-efeb-472c-901b-5296e1b7f3ac"
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
        <button onClick={this.storeTest}>GET FROM STATE</button>
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
