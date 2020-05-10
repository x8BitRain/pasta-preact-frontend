/* eslint:disable */
import { Component, h } from "preact";
import { Connect } from "redux-zero/preact";
import { loginEndpoint } from "../util/endpoints";
import store from "../util/Store";
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

  loginHandler = () => {
    const raw = JSON.stringify({
      user: {
        email: this.state.email,
        password: this.state.password
      }
    });

    fetch(loginEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: raw
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
          loggedIn: true
        });
        this.setState(
          {
            loginResult: "Logged in ✔️"
          },
          () => {
            this.handleLogin();
          }
        );
      })
      .catch(error => {
        console.log("Request failed", error);
      });
  };

  handleLogin = () => {
    this.props.onLoginSuccess("logged in!");
  };

  componentDidMount() {
    // document.querySelector("#login-box > input[type=text]:nth-child(4)").value =
    //   "meru@btr.pm";
    // document.querySelector("#login-box > input[type=text]:nth-child(8)").value =
    //   "makanbakso123";
  }

  componentWillUnmount() {}

  render() {
    return (
      <div id="login-box">
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          onInput={event => this.setState({ email: event.target.value })}
          type="text"
          name="email"
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          onInput={event => this.setState({ password: event.target.value })}
          type="text"
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
        <button onClick={this.handleLogin}>callback</button>
      </div>
    );
  }
}

export default Login;
