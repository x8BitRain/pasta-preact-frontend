import store from "./Store";
import { clipboardWrite } from "./clipboardSync";
import cable from "actioncable";
import endpoints from "./endpoints";
class PasteSocket {
  constructor(uid, token, roomId) {
    this.uid = uid;
    this.token = token;
    this.roomId = roomId;
    this.pastes = store.getState().pastes;
    this.socket = cable.createConsumer(
      `${endpoints.websocket}?uid=${this.uid}&token=${this.token}`
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
          if (store.getState().instaCopy) {
            clipboardWrite(data.content.content);
          }
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
