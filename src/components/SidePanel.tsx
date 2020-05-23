import { Connect } from "redux-zero/preact";
import { Component, h, Fragment } from "preact";
import store from "../util/Store";

// const mapToProps = ({ loggedIn, isLive, wroteIncomingPaste }) => ({
//   loggedIn,
//   isLive,
//   wroteIncomingPaste
// });

class SidePanel extends Component {
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

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <framgment style="position:absolute; top:0px; left:50%;">
        <input
          type="checkbox"
          name="instaCopy"
          onChange={this.enableInstaCopy}
        />
        <label htmlFor="instaCopy"> instaCopy </label>
      </framgment>
    );
  }
}

export default SidePanel;

// <Connect mapToProps={mapToProps}>
// {({  }) => (

// )}
// </Connect>
