import { Connect } from "redux-zero/preact";
import { Component, h } from "preact";
import store from "../util/Store";
import LiveIndicator from "./small/LiveIndicator.tsx";
import "../style/navbar.scss";

const mapToProps = ({ loggedIn, isLive }) => ({ loggedIn, isLive });
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openLogin = () => {
    const showLogin = store.getState({}).showLogin
    store.setState({
      showLogin: !showLogin
    })
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Connect mapToProps={mapToProps}>
        {({ loggedIn, isLive }) => (
          <div id="navbar">
            <div id="logo">
              <b>PASTA</b>
            </div>
            <div id="status">
              <p onClick={this.openLogin}>Login</p>
              <LiveIndicator isLive={isLive}/>
            </div>
          </div>
        )}
      </Connect>
    );
  }
}

export default Navbar;
