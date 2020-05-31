import endpoints from "./endpoints";

const checkLogin = async token => {
  const headers = new Headers();
  headers.append("Authorization", token);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  const response = await fetch(endpoints.getCurrentUser, requestOptions);
  const data = await response.json();
  console.log(data);
  return data;
};

export default checkLogin;
