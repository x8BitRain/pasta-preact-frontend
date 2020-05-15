import endpoints from "./endpoints";

async function checkLogin(token) {
  const headers = new Headers();
  headers.append("Authorization", token);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  const response = await fetch(endpoints.getCurrentUser, requestOptions);
  const data = await response.json();
  return data;
}

export default checkLogin;