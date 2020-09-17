// import admin from "firebase-admin"
// import serviceAccount from 'utils/serviceAccountKey.json'

const API_ENDPOINT = "https://discord.com/api/v6";
const CLIENT_ID = "751652284269723698";
const CLIENT_SECRET = "ME5ZxLuxWL8e4TFZWtAldZ8niVcOlVi1";
const REDIRECT_URI = "http://localhost:3000/auth/redirect";

// admin.initializeApp({
//   credential: admin.credential.cert((serviceAccount)),
//   databaseURL: "https://discordstack.firebaseio.com",
// });

// const db = admin.firestore();

async function exchangeCodeForDiscordToken(code: string) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("code", code);
  urlencoded.append("client_id", CLIENT_ID);
  urlencoded.append("client_secret", CLIENT_SECRET);
  urlencoded.append("redirect_uri", REDIRECT_URI);
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("scope", "guilds email identify");

  const request = new Request(`${API_ENDPOINT}/oauth2/token`, {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  });

  try {
    const response = await fetch(request);
    const token = await response.text();
    return token;
  } catch (err) {
    throw new Error("Failed to get access token.");
  }
}

export default async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  switch (req.method) {
    case "POST":
      const { code } = JSON.parse(req.body);

      try {
        const discordToken = await exchangeCodeForDiscordToken(code);
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "YES", discordToken }));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      }
      break;
  }

  // res.statusCode = 400;
  // res.end(JSON.stringify({ message: "fial" }));
};
