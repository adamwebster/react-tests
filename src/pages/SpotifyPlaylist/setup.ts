export const authEndpoint = "https://accounts.spotify.com/authorize?";
export const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const redirectUri = process.env.REACT_APP_SPOTIFY_URL_REDIRECT;
export const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private"
];
// Get the hash of the url
export const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial: any, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";
