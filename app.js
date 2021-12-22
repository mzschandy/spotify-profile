require("dotenv").config()

const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")
const request = require("request")
const querystring = require("query-string")
const cookieParser = require('cookie-parser');

const app = express() 
const PORT = process.env.PORT || 5000

app.use(express.static(path.resolve(__dirname, "/client/build")))
app.use(cors({origin: true, credentials: true}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:5000/callback"
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000"

if (process.env.NODE_ENV !== 'production') {
  REDIRECT_URI = 'http://localhost:5000/callback';
  FRONTEND_URI = 'http://localhost:3000';
}

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/build/index.html'));
  console.log(__dirname)
  // console.log("This is the default/home route");
})

app.get("/login", (req, res) => {
  const state = generateRandomString(16)
  const scope = "user-read-private user-read-email user-follow-read user-library-read user-top-read"

  // console.log("Oh this is the login route");

  res.cookie(stateKey, state);
  res.redirect("https://accounts.spotify.com/authorize?" +
  querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    state: state
  }))
})

app.get("/callback", (req, res) => {
  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null

  // console.log("code>", code);
  // console.log("state>", state);
  // console.log("stored state>", storedState);

  if (state === null || state !== storedState) {
    console.log("RIP something went wrong");
    res.redirect("/#" +
    querystring.stringify({
      error: "state_mismatch"
    }))
  } else {
    // console.log("Things are going well");

    res.clearCookie(stateKey)

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true,
    }

    // console.log("authOptions.json > ", authOptions.json);
    // console.log("authOptions", authOptions)


    request.post(authOptions, (error, response, body) => {
      // console.log("made it to the request function")
      if(!error && response.statusCode === 200) {
        // console.log("body", body);

        const access_token = body.access_token
        const refresh_token = body.refresh_token

        /*
        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        }

        request.get(options, (error, response, body) => {
          console.log(body)
        })*/
        // console.log(access_token);
        // console.log(refresh_token);

        res.redirect(`${FRONTEND_URI}/#` + 
        querystring.stringify({
          access_token,
          refresh_token
        }))

        // console.log(access_token);
        // console.log(refresh_token);
      } else {
        res.redirect("/#" +
        querystring.stringify({
          error: 'invalid_token'
        }))
      }
    })
  }
})

app.get("/refresh_token", (req, res) => {
  const refresh_token = req.query.refresh_token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true,
  }

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  })
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/public/index.html'))
})


app.listen(PORT, () => {
  console.log("App running on port", PORT)
  console.log(__dirname)
  console.log(path.resolve(__dirname, '/client/build/index.html'))
  console.log(path.sendFile(__dirname, '/client/public/index.html'))
})