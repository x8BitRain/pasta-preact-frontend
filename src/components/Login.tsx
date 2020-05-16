import { Component, h } from "preact";
import { Connect } from "redux-zero/preact";
import endpoints from "../util/endpoints";
import store from "../util/Store";
import checkLogin from "../util/checkLogin";
import PasteSocket from "../util/Websocket";
import "../style/login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginResult: ""
    };
  }

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
          this.setState({
            loginResult: response.statusText
          });
        }
        return response.json();
      })
      .then(result => {
        localStorage.setItem("authToken", result.token); // Store auth token in localStorage
        store.setState({
          token: result.token,
          email: result.email,
          userId: result.userId,
          loggedIn: true
        });
        this.setState(
          {
            loginResult: "Logged in ✔️"
          },
          () => {
            this.loginCallback();
          }
        );
      })
      .catch(error => {
        console.log("Request failed", error);
      });
  };

  loginCallback = () => {
    this.props.onLoginSuccess("logged in!");
  };

  componentDidMount() {
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
              loginResult: "Logged in ✔️"
            });
            store.setState({
              token: token,
              uid: data.id,
              loggedIn: true,
              rooms: data.attributes.rooms[0].id,
              pasteSocket: socket
            });
          }
        })
        .catch(reason => console.log(reason.message));
    } else {
      store.setState({
        loggedIn: false
      });
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <div id="login-box">
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            onInput={event => this.setState({ email: event.target.value })}
            value={this.state.email}
            autoComplete="username"
            type="text"
            name="email"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            onInput={event => this.setState({ password: event.target.value })}
            value={this.state.password}
            autoComplete="password"
            type="password"
            name="password"
          />
          <p>{this.state.loginResult}</p>
          <button onClick={this.loginHandler}>Login</button>
          <button
            onClick={() => {
              console.log(this.state);
            }}
          >
            log creds in state
          </button>
          <button onClick={this.loginCallback}>callback</button>
        </form>
      </div>
    );
  }
}

export default Login;
