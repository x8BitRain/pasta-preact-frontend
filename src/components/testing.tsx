/* eslint-disable */
import { Component } from "preact";
// import { consumer, makePaste } from "../util/websocket";
import cable from "actioncable";

class Testing extends Component {
  constructor() {
    super();
    this.state = {
      uid: "cf76822f-b97f-4946-8bfe-84ced8717e2b",
      token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY2Y3NjgyMmYtYjk3Zi00OTQ2LThiZmUtODRjZWQ4NzE3ZTJiIiwiZXhwIjoxNTg5MTE2ODc1fQ.wL8HAQkHFX8Sg31Um3JXTKO4AmK3Fz8LZkTyghJG82w",
      pasteParams: {
        command: "message",
        action: "create",
        data: {
          content: "Another Brick in the wall",
          content_type: "string",
          device: "nexus6p"
        }
      }
    };
    this.socket = cable.createConsumer(
      `ws://localhost:3000/live/?uid=${this.state.uid}&token=${this.state.token}`
    );
  }

  subscribeConsumer = () => {
    this.consumer = this.socket.subscriptions.create({
      channel: "PasteChannel",
      room_id: "9a446ad3-1c34-43f2-9f93-dcd74de5059c"
    });
  };


  makePaste = () => {
    this.consumer.send(this.state.pasteParams);
  }


  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let time = new Date(this.state.time).toLocaleTimeString();
    return (
      <fragment>
        <span>{time}</span>
        <button onclick={this.subscribeConsumer}>SUBSCRIBE</button>
        <button onclick={this.makePaste}>MAKE PASTE</button>
      </fragment>
    );
  }
}

export default Testing;
