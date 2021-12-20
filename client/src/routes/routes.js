import axios from "axios";

const EXPIRATION_TIME = 3600 * 1000;

const setTokenTimestamp = () => {window.localStorage.setItem("spotifyTokenTimestamp", Date().now)};
const setAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem("spotifyAccessToken", token);
}
const setRefreshToken = (token) => {window.localStorage.setItem("spotifyRefreshToken", token)};
const getTokenTimestamp = () => {window.localStorage.getItem("spotifyTokenTimestamp")};
const getAccessToken = () => {window.localStorage.getItem("spotifyAccessToken")};
const getRefreshToken = () => {window.localStorage.getItem("spotifyRefreshToken")};

const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  //console.log("q", q);
  //  console.log("window location", window.location)
  // console.log("window location hash", window.location.hash.substring(1))
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  // console.log("hashparams", hashParams);
  
  return hashParams;
}

const refreshToken = async () => {
  const {data} = await axios.get(`/refresh_token?refresh_token=${getRefreshToken()}`);
  const {accessToken} = data;
  setAccessToken(accessToken);
  window.location.reload();
}

export const getToken = () => {
  const {error, access_token, refresh_token} = getHashParams();
  // console.log("getHashParams() >",getHashParams());

  // console.log("access token?", access_token)
  // console.log("refresh token", access_token)

  if (error) {
    console.log(error);
    refreshToken();
  }

  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    refreshToken();
  }

  const localAccessToken = getAccessToken();

  if ((!localAccessToken || localAccessToken === "undefined") && access_token) {
    setAccessToken(access_token);
    setRefreshToken(access_token);
    return access_token;
  }
}

export const token = getToken();

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
};

// console.log("headers", headers)
//console.log(axios.get('https://api.spotify.com/v1/me', { headers }))

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });

export const getTopArtistsShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
    headers,
  });
export const getTopArtistsMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
    headers,
  });
export const getTopArtistsLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });

  export const getTopTracksShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });
export const getTopTracksMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
    headers,
  });

export const getAllArtists = () => {
  axios.all([getTopArtistsShort(), getTopArtistsMedium(), getTopArtistsLong()])
    .then(
      axios.spread((artistShort, artistMedium, artistLong) => ({
        artistShort: artistShort.data,
        artistMedium: artistMedium.data,
        artistLong: artistLong.data,
      })),
    );
}

export const getTopTracksLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

  export const getUserInfo = () =>
  axios
    .all([getUser(), getTopArtistsLong(), getTopTracksLong()])
    .then(
      axios.spread((user, topArtists, topTracks) => ({
        user: user.data,
        topArtists: topArtists.data,
        topTracks: topTracks.data,
      })),
    );
