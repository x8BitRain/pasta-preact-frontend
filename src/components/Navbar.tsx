import { Connect } from "redux-zero/preact";
import { Component, h } from "preact";
import store from "../util/Store";
import LiveIndicator from "./small/LiveIndicator";
import Message from "./small/Message";
import "../style/navbar.scss";

const mapToProps = ({ loggedIn, isLive, flashMessage, messageContent }) => ({
  loggedIn,
  isLive,
  flashMessage,
  messageContent
});
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openLogin = async () => {
    const showLogin = store.getState({}).showLogin;
    store.setState({
      showLogin: !showLogin
    });
  };

  toggleMenu = () => {
    this.props.menuToggle();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Connect mapToProps={mapToProps}>
        {({ loggedIn, isLive, flashMessage, messageContent }) => (
          <div id="navbar">
            <div id="logo-menu-container">
              <div onClick={this.toggleMenu} id="menu-btn">
                <span>三</span>
              </div>
              <div id="logo">
                <h2>PASTA</h2>
              </div>
            </div>
            <div id="copied-status">
              {flashMessage ? <Message message={messageContent} /> : null}
            </div>
            <div id="status">
              {!loggedIn ? (
                <p id="login-button" onClick={this.openLogin}>
                  Login
                </p>
              ) : (
                <p></p>
              )}
              <LiveIndicator isLive={isLive} />
            </div>
          </div>
        )}
      </Connect>
    );
  }
}

export default Navbar;
