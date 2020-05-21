import { Connect } from "redux-zero/preact";
import { Component, h } from "preact";
import store from "../util/Store";
import LiveIndicator from "./small/LiveIndicator";
import "../style/navbar.scss";

const mapToProps = ({ loggedIn, isLive }) => ({ loggedIn, isLive });
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openLogin = async () => {
    const showLogin = store.getState({}).showLogin;
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
              <h2>PASTA</h2>
            </div>
            <div id="status">
              {!loggedIn ? (
                <p id="login-button" onClick={this.openLogin}>
                  Login
                </p>
              ) : (
                <p></p>
              )}
              <LiveIndicator isLive={isLive}/>
            </div>
          </div>
        )}
      </Connect>
    );
  }
}

export default Navbar;
