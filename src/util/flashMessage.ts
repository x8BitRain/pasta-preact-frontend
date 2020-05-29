import store from "./Store";
import delay from "./delay";

const flashMessage = async (
  message = { content: "", type: true, delay: 2000 }
) => {
  store.setState({
    flashMessage: true,
    messageContent: message
  });
  await delay(message.delay);
  store.setState({
    flashMessage: false,
    messageContent: {}
  });
};

export default flashMessage;
