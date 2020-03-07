/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Card,
  DropdownButton,
  ToastProvider,
  Button
} from "@adamwebster/fused-components";
import styled from "styled-components";
import Search from "./search";
import TrackList from "./tracklist";

import { PlaylistContextProvider } from "./PlaylistContext";
import { ExampleFooter } from "../../components/UI/ExampleFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const authEndpoint = "https://accounts.spotify.com/authorize?";
// https://accounts.spotify.com/en/authorize?client_id=7e5f8b9e5390468fb25f323a0647c507&response_type=code&redirect_uri=https:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = "http://localhost:3000/fusedmusic";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private"
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

const PlayList = styled.div`
  list-style: none;
  padding: 0;
  width: 300px;
  margin: 0 0 30px 0;
`;
const PlaylistCard = styled(Card)`
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 0 10px #00000050;
`;
const PlaylistTitle = styled.h3`
  background-color: #1db954;
  margin: 0;
  padding: 10px 10px 10px 10px;
  color: #fff;
  font-size: 28px;
  display: flex;
  border-radius: 5px 5px 0 0;

  align-content: center;
  align-items: center;
  img {
    margin-right: 10px;
    border-radius: 50%;
  }
`;

const PlayListWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 10px;
  color: #444;
  padding: 10px;
  align-items: top;
  justify-items: center;
`;

const ButtonText = styled.span`
top: -4px;
position:relative;
margin-left: 5px;
`

interface playlistInterface {
  name?: string;
  images?: any;
}

function FusedMusic() {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [trackSource, setTrackSource] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [playlist, setPlaylist] = useState<playlistInterface>();
  useEffect(() => {
    CheckToken();
    if (token) {
      getPlaylists();
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

  const getPlaylists = () => {
    axios
      .get(`https://api.spotify.com/v1/me/playlists/`, {
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
      .catch(err => {
        if (err) {
          setToken("");
          localStorage.removeItem("FS_SPOTIFY_TOKEN");
        }
      });
  };

  const getTracks = (href: any) => {
    axios
      .get(href, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        setTracks(response.data.items);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getPlaylist = (id: string) => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        setTrackSource(response.data.tracks.href);
        setPlaylist(response.data);
        setSelectedPlaylist(response.data.id);
        getTracks(response.data.tracks.href);
      })
      .catch(err => {
        console.log(err);
      });
  };

  interface items {
    name: string;
    id: string;
    images: any;
    tracks: { href: any };
  }

  const ContextValue = {
    playlists,
    tracks,
    token,
    selectedPlaylist,
    playlist,
    trackSource,
    getTracks: (h: any) => getTracks(h)
  };
  return (
    <div className="App">
        <PlayListWrapper>
          {!token && (
            <Button
              buttonColor="#1db954"
              primary
              onClick={() =>
                (window.location.href = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`)
              }
            >
             <FontAwesomeIcon  size="2x" icon={['fab', 'spotify']}/> <ButtonText>Login to Spotify</ButtonText>
            </Button>
          )}
          {token && (
            <>
              <ToastProvider position="bottom">
                <DropdownButton buttonColor="#1db954" as="button" primary label={playlist?.name ? playlist?.name :  'Select a playlist'}>
                  <DropdownButton.Menu>
                    {playlists.map((item: { name: string; id: string }) => {
                      return (
                        <DropdownButton.MenuItem
                          key={item.id}
                          onClick={() => getPlaylist(item.id)}
                        >
                          {item.name}
                        </DropdownButton.MenuItem>
                      );
                    })}
                  </DropdownButton.Menu>
                </DropdownButton>
                <PlaylistContextProvider value={ContextValue}>
                  {playlist && (
                    <PlayList>
                      <PlaylistCard>
                        <PlaylistTitle>
                          {playlist?.images[2] && (
                            <img
                              alt={playlist.name}
                              src={playlist?.images[2].url}
                            />
                          )}

                          {playlist?.name}
                        </PlaylistTitle>
                        <TrackList />
                        <Search />
                      </PlaylistCard>
                    </PlayList>
                  )}
                </PlaylistContextProvider>
              </ToastProvider>
            </>
          )}
        </PlayListWrapper>
        <ExampleFooter linkColor="#1db954" />
    </div>
  );
}

export default FusedMusic;
