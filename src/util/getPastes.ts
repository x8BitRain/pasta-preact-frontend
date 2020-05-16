import endpoints from "./endpoints";

async function getPastes(token) {
  const headers = new Headers();
  headers.append("Authorization", token);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  const response = await fetch(endpoints.getPastes, requestOptions);
  const data = await response.json();
  return data;
}

export default getPastes;