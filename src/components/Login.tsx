import { Component, h, Fragment, createRef } from "preact";
import { Connect } from "redux-zero/preact";
import endpoints from "../util/endpoints";
import store from "../util/Store";
import delay from "../util/delay";
//import anime from 'animejs/lib/anime.es.js';
import checkLogin from "../util/checkLogin";
import PasteSocket from "../util/Websocket";
import getPastes from "../util/getPastes";
import "../style/login.scss";

const mapToProps = ({ showLogin }) => ({ showLogin });
class Login extends Component {
  loginBox = createRef();
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginResult: "Login",
      loginStyle: "#444444"
    };
  }

  afterLogin = () => {
    // If token is present, verify authenticity by getting current user from api.
    const token = localStorage.getItem("authToken");
    if (token) {
      checkLogin(token)
        .then(response => {
          const data = response.data;
          console.log(data);
          // instead check response against typescript structure perhaps.
          if (data.id) {
            // Init websocket connection & subscribe.
            const socket = new PasteSocket(
              data.id,
              token,
              data.attributes.rooms[0].id
            );
            socket.subscribe();
            this.setState({
              loginResult: "Logged in ✔️",
              loginStyle: "green"
            });
            store.setState({
              token: token,
              uid: data.id,
              loggedIn: true,
              rooms: data.attributes.rooms[0].id,
              pasteSocket: socket
            });
            this.hideLogin();
          }
        })
        .then(() => {
          getPastes(token)
            .then(response => {
              const pastes = response.data;
              store.setState({
                pastes: pastes
              });
            })
            .catch(reason => console.log(reason.message));
        })
        .catch(reason => console.log(reason.message));
    } else {
      store.setState({
        loggedIn: false
      });
    }
  };

  loginHandler = e => {
    e.preventDefault();
    const loginDetails = JSON.stringify({
      user: {
        email: this.state.email,
        password: this.state.password
      }
    });

    fetch(endpoints.login, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: loginDetails
    })
      .then(response => {
        if (!response.ok) {
          this.setState(
            {
              loginResult: "Incorrect Login",
              loginStyle: "red"
            },
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            async () => {
              await delay(1500);
              this.setState({
                loginResult: "Login",
                loginStyle: "#444444"
              });
            }
          );
        }
        return response.json();
      })
      .then(result => {
        localStorage.setItem("authToken", result.token); // Store auth token in localStorage
        this.afterLogin();
        this.loginCallback();
      })
      .catch(error => {
        console.log("Request failed", error);
      });
  };

  loginCallback = () => {
    this.props.onLoginSuccess("logged in!");
  };

  hideLogin = async () => {
    await delay(850);
    this.loginBox.current.style.opacity = 0;
    await delay(1100);
    store.setState({
      showLogin: false
    });
  };

  componentDidMount() {
    this.afterLogin();
    // store.setState({
    //   loginBox: this.loginBox
    // })
  }

  componentWillUnmount() {}

  render() {
    return (
      <Connect mapToProps={mapToProps}>
        {({ showLogin }) => (
          <Fragment>
            {showLogin ? (
              <div ref={this.loginBox} id="login-box">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                >
                  <input
                    onInput={event =>
                      this.setState({ email: event.target.value })
                    }
                    value={this.state.email}
                    autoComplete="username"
                    placeholder="Email"
                    type="email"
                    name="email"
                  />
                  <br />
                  <input
                    onInput={event =>
                      this.setState({ password: event.target.value })
                    }
                    value={this.state.password}
                    autoComplete="password"
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                  <div id="login-remember">
                    <button onClick={this.loginHandler}>
                      {this.state.loginResult !== "" ? (
                        <p style={"color: " + this.state.loginStyle}>
                          {this.state.loginResult}
                        </p>
                      ) : (
                        "Login"
                      )}
                    </button>
                    <div id="remember-me">
                      <input type="checkbox" name="remember" checked />
                      <label htmlFor="remember">Remember me</label>
                    </div>
                  </div>
                  {/* <button onClick={this.loginCallback}>callback</button> */}
                </form>
              </div>
            ) : null}
          </Fragment>
        )}
      </Connect>
    );
  }
}

export default Login;

// store.setState({
//   token: result.token,
//   email: result.email,
//   userId: result.userId,
//   loggedIn: true
// });
// this.setState(
//   {
//     loginResult: "Logged in ✔️"
//   },
//   () => {
//     this.loginCallback();
//     getPastes(result.token).then(response => {
//       const pastes = response.data;
//       console.log(pastes);
//       store.setState({
//         pastes: pastes
//       });
//     });
//   }
// );
