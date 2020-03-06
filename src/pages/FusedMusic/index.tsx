/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@adamwebster/fused-components";

export const authEndpoint = "https://accounts.spotify.com/authorize?";
// https://accounts.spotify.com/en/authorize?client_id=7e5f8b9e5390468fb25f323a0647c507&response_type=code&redirect_uri=https:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = "http://localhost:3000/fusedmusic";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private"
];
// Get the hash of the url
const hash = window.location.hash
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

function FusedMusic() {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    CheckToken();
    if (token) {
      getPlaylist();
    }
  }, [token]);

  const CheckToken = () => {
    if (hash.access_token) {
      localStorage.setItem("FS_SPOTIFY_TOKEN", hash.access_token);
      setToken(hash.access_token);
    }
    if (localStorage.getItem("FS_SPOTIFY_TOKEN")) {
      setToken(localStorage.getItem("FS_SPOTIFY_TOKEN") as string);
    }
  };

  const getPlaylist = () => {
    axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        setPlaylists(response.data.items);
        let tracksURLToSave: any[] = [];
        response.data.items.map((item: any) => {
          tracksURLToSave.push(item.tracks.href);
        });
        return tracksURLToSave;
      })
  };

 const getTracks = (href: any) => {
   axios.get(href, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
  .then(response => {
    setTracks(response.data.items);
  })
 
 }

  interface items {
    name: string;
    id: string;
    images: any;
    tracks: { href: any};
  }
  return (
    <div className="App">
      <header className="App-header">
        {!token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {token && (
          <>
          <ul>
            {playlists.map((item: items, index: any) => {
              return (
                <li key={item.id}>
                  <Button onClick={() => getTracks(item.tracks.href)}>{item.name} </Button>                 
                </li>
              );
            })}
          </ul>

          <ul>
            {tracks.map((item: {track: {name: string}}) => {
              return(
              <li>{item.track.name}</li>
              )
            })}
          </ul>
          </>
        )}
        
      </header>
    </div>
  );
}

export default FusedMusic;
