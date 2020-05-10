/* eslint-disable */
import { Component } from "preact";
// import { consumer, makePaste } from "../util/websocket";
import cable from "actioncable";

class Testing extends Component {
  constructor() {
    super();
    this.state = {
      uid: "b9498d14-cb86-4c3c-9424-375cdfc43f52",
      token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYjk0OThkMTQtY2I4Ni00YzNjLTk0MjQtMzc1Y2RmYzQzZjUyIiwiZXhwIjoxNTg5MjA2NTE3fQ.gtlV2TXmAQTfNcxLm1I0c5feBMA_yglnq0Xocr8m3Ho",
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
      `ws://localhost:3334/live?uid=${this.state.uid}&token=${this.state.token}`
    );
  }

  subscribeConsumer = () => {
    this.consumer = this.socket.subscriptions.create({
      channel: "PasteChannel",
      room_id: "52c923b1-efeb-472c-901b-5296e1b7f3ac"
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
