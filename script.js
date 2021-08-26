const authLink = document.querySelector("a");

window.onload = generateAccessToken;
function generateAccessToken() {
  if (window.location.search.includes("code")) {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const url = new URL(API_ENDPOINT + "/oauth2/token");
    const data = new URLSearchParams(
      Object.entries({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      })
    );

    postData(url, data.toString());
  }
}

// Example POST method implementation:
async function postData(url = "", data = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      // "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data, // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
