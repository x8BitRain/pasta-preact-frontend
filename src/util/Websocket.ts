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
          store.setState({
            isLive: true
          })
        },
        disconnected: function() {
          console.log("disconnected!");
          store.setState({
            isLive: false
          })
        },
        received: data => {
          this.pastes = store.getState().pastes;
          console.log("Got a Paste!", data);
          store.setState({
            pastes: [...this.pastes, {
              attributes: data.content,
              id: data.content.id
            }]
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
