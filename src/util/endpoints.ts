//const isProd = window.location.href.includes("app");
const isProd = true;

const endpoint = isProd ? "https://api.pasta.to" : "http://localhost:3000";

const endpoints = {
  login: endpoint + "/v1/tokens",
  getCurrentUser: endpoint + "/v1/users/",
  getPastes: endpoint + "/v1/pastes",
  websocket: isProd
    ? "wss://api.pasta.to:8443/live"
    : "ws://localhost:8443/live"
};

export default endpoints;
