import store from './Store';
import cable from "actioncable";

class PasteSocket {
  constructor(uid, token, roomId) {
    this.uid = uid;
    this.token = token;
    this.roomId = roomId;
    this.pastes = store.getState().pastes;
    this.socket = cable.createConsumer(
      `ws://localhost:3334/live?uid=${this.uid}&token=${this.token}`
    );
  }

  subscribe() {
    this.consumer = this.socket.subscriptions.create(
      {
        channel: "PasteChannel",
        room_id: this.roomId
      },
      {
        connected: function() {
          console.log("connected!");
        },
        disconnected: function() {
          console.log("disconnected!");
        },
        received: data => {
          this.pastes = store.getState().pastes;
          console.log("Got a Paste!", data.content.content);
          store.setState({
            pastes: [
              ...this.pastes,
              [data.content.content, data.content.created_at]
            ]
          });
        }
      }
    );
  };

  send(paste) {
    const pasteParams = {
      command: "message",
      action: "create",
      data: {
        content: paste,
        content_type: "string",
        device: "nexus6p"
      }
    };
    this.consumer.send(pasteParams);
  };

}

export default PasteSocket;
