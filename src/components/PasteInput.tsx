/* eslint-disable */
import { Component, h } from "preact";
import store from '../util/Store';
import '../style/pasteInput.scss';

class PasteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePaste = (e) => {
   
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div id="paste-input">
        <input type="text"/>
        <button onclick={this.handlePaste}>Paste</button>
      </div>
    );
  }
};

export default PasteInput;