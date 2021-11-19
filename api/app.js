const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")
const { request } = require("http")

const app = express() 
const port = 5000

app.use(express.static(path.resolve(__dirname, "../client/public/")))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

const client_id = "1f75bb9187d04b2a8015552aad3f58de"
const redirect_uri = "http://localhost:3000/callback"

const generateRandomString = (length) => {
  const text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

app.get("/test", (req, res) => {
  res.redirect("https://theverge.com");
})

app.get("/", (req, res) => {
  res.render(path.resolve(__dirname, "../client/public/index.html"))
})

app.get("/login", (req, res) => {
  const state = generateRandomString(16)
  const scope = "user-read-private user-read-email user-follow-read user-library-read user-top-read"

  res.cookie(stateKey, state);
  res.redirect("https://accounts.spotify.com/authorize?" +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }))
})

app.get("/callback", (req, res) => {
  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state != storedState) {
    res.redirect("/#" +
    querystring.stringify({
      error: "state_mismatch"
    }))
  } else {
    res.clearCookie(stateKey)
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    }

    request.post(authOptions, (error, response, body) => {
      if(!error && response.statusCode === 200) {
        const access_token = body.access_token
        const refresh_token = body.refresh_token

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        }

        request.get(options, (error, response, body) => {
          console.log(body)
        })

        res.redirect("/#" + 
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }))
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
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
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

app.listen(port, () => {
  console.log("App running on port", port)
})