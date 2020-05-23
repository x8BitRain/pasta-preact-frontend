import { Connect } from "redux-zero/preact";
import { Component, h, Fragment } from "preact";
import store from "../util/Store";
import "../style/settings.scss";

// const mapToProps = ({ loggedIn, isLive, wroteIncomingPaste }) => ({
//   loggedIn,
//   isLive,
//   wroteIncomingPaste
// });

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  enableInstaCopy = () => {
    store.setState({
      instaCopy: !store.getState().instaCopy
    });
    console.log("instaCopy is ", store.getState().instaCopy);
  };

  componentWillUnmount() {}

  render() {
    return (
      <div id="settings">
        <input
          type="checkbox"
          name="instaCopy"
          onChange={this.enableInstaCopy}
        />
        <label htmlFor="instaCopy">
          Write to clipboard on recieving paste.
        </label>
      </div>
    );
  }
}

export default Settings;

// <Connect mapToProps={mapToProps}>
// {({  }) => (

// )}
// </Connect>
