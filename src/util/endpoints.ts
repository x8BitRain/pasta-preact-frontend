const isProd = window.location.href.includes("app");

const endpoint = isProd ? "https://api.pasta.to" : "http://localhost:3000";

const endpoints = {
  login: endpoint + "/v1/tokens",
  getCurrentUser: endpoint + "/v1/users/",
  getPastes: endpoint + "/v1/pastes",
  websocket: isProd
    ? "wss://api.pasta.to:3334/live"
    : "ws://localhost:3334/live"
};

export default endpoints;
