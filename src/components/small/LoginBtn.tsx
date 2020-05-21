import { h } from "preact";

const LoginBtn = loginResult => {
  return (
    (loginResult === "Logged in") ? <p style="color:red">Incorrect Login Details</p> : "Log In"
  )
};

export default LoginBtn;

// if (loginResult === "Unauthorized") {
//   return ;
// } else if (loginResult === "Logged in") {
//   return <p style="color:green">Logged In ✔️</p>;
// } else {
//   return "Log In";
// }