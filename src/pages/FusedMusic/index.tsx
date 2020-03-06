/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Card } from "@adamwebster/fused-components";
import styled from 'styled-components';

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
  .reduce(function (initial: any, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

interface ITracks {
  href: string;
  token: any;
}

const TrackListStyled = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li{
    padding: 10px;
    box-sizing:border-box;
    border-bottom: solid 1px ${props => props.theme.borderColor};
    &:last-child{
      border-bottom: 0;
    }
  }
`
const TrackList = ({ href, token }: ITracks) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getTracks(href);
  }, [href]);
  const getTracks = (href: any) => {
    axios
      .get(href, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        setTracks(response.data.items);
      });
  };

  return (
    <TrackListStyled>
      {tracks.map((item: { track: { name: string, id: string, artists: any } }) => {
        return (
            <li key={item.track.id}>{item.track.name} {item.track.artists[0].name}</li>
        );
      })}
    </TrackListStyled>
  );
};

const StyledSearchMenu = styled.ul`
  background-color: #fff;
  padding: 0;
  margin: 0;
  list-style:none;
  position: absolute;
  border: solid 1px ${props => props.theme.borderColor};
  z-index: 9;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 10px #00000050;
  top: 45px;
  border-radius: 5px;
  li{
    padding: 10px;
    box-sizing:border-box;
    border-bottom: solid 1px ${props => props.theme.borderColor};
    &:last-child{
      border-bottom: 0;
    }
  }
`

const SearchWrapper = styled.div`
  position:relative;
`
interface ISearch {
  token: string;
}
const Search = ({ token }: ISearch) => {
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const searchForTrack = (e: { target: { value: string } }) => {
    setSearchValue(e.target.value);
    axios
      .get(`https://api.spotify.com/v1/search?q=${e.target.value}&type=track&market=US&limit=5`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        setResults(response.data.tracks.items);
      })
  }
  return (
    <SearchWrapper>
      <Input value={searchValue} onChange={e => searchForTrack(e)} />
      {searchValue.length > 0 &&
        <StyledSearchMenu>
          {results.length === 0 &&
            <li>No Results Found</li>
          }
          {results.map((item: { name: string, id: string, artists: any }) => {
            return (
              <li onClick={() => setSearchValue('')} key={item.id}>{item.name} | {item.artists[0].name}</li>
            )
          })}
        </StyledSearchMenu>
      }
    </SearchWrapper>
  )
}

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
      }).catch(err => {
        if (err) {
          setToken('');
          localStorage.removeItem('FS_SPOTIFY_TOKEN');
        }
      });
  };

  interface items {
    name: string;
    id: string;
    images: any;
    tracks: { href: any };
  }

  const PlayList = styled.div`
  list-style: none;
  padding:0; 
  width: 300px;
  margin: 0 0 30px 0;
  `
  const PlaylistCard = styled(Card)`
    padding: 30px;
    box-sizing:border-box;
  `
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
                  <PlayList key={item.id}>
                    <PlaylistCard>
                      {item.name}{" "}
                      <TrackList href={item.tracks.href} token={token} />
                      <Search token={token} />
                    </PlaylistCard>
                  </PlayList>
                );
              })}
            </ul>
          </>
        )}
      </header>
    </div>
  );
}

export default FusedMusic;
