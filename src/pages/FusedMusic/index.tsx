/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Card, Icon, Colors } from "@adamwebster/fused-components";
import styled from 'styled-components';

export const authEndpoint = "https://accounts.spotify.com/authorize?";
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
  playlistID: string;
  getPlaylist: () => void;
}

const TrackListStyled = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li{
    padding: 10px;
    box-sizing:border-box;
    position:relative;
    border-bottom: solid 1px ${Colors.border};
  }
`
const SongTitle = styled.div`
font-weight:bold;
`

const RemoveIcon = styled.span`
  width: 16px;
  height: 16px;
  display: inline-block;
  background-color: ${Colors.red};
  box-sizing:border-box;
  margin-left: 5px;
border-radius: 50%;
top: calc(50% - 8px);
right: 10px;
position: absolute;
  svg{
    color: ${Colors.light};
    position: relative;
    cursor: pointer;;
  }
`

const TrackList = ({ href, token, playlistID, getPlaylist }: ITracks) => {
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

  const RemoveFromPlaylist = (trackID: string) => {
    console.log(playlistID)
    axios
    .delete(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        data: { "uris": [`spotify:track:${trackID}`]},
        headers: {
          Authorization: "Bearer " + token
        },
    })
    .then(response => {
      getPlaylist();
        console.log(response)
    })
  }

  return (
    <TrackListStyled>
      {tracks.map((item: { track: { name: string, id: string, artists: any } }) => {
        return (
            <li key={item.track.id}><SongTitle>{item.track.name}</SongTitle>{item.track.artists[0].name} <RemoveIcon onClick={()=> RemoveFromPlaylist(item.track.id)} ><Icon icon='times'/></RemoveIcon> </li>
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
  width: calc(100% - 20px);
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
  padding: 10px;
`


interface ISearch {
  token: string;
  playlistID: string;
  getPlaylist: () => void;
}
const Search = ({ token, playlistID, getPlaylist }: ISearch) => {
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

  const AddToPlaylist = (trackID: string) => {
    console.log(playlistID)
    setSearchValue('')
    axios
    .post(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      "uris": [`spotify:track:${trackID}`],  
    }, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      getPlaylist();
        console.log(response)
    })
  }

  
  return (
    <SearchWrapper>
      <Input placeholder="Add an item" value={searchValue} onChange={e => searchForTrack(e)} />
      {searchValue.length > 0 &&
        <StyledSearchMenu>
          {results.length === 0 &&
            <li>No Results Found</li>
          }
          {results.map((item: { name: string, id: string, artists: any }) => {
            return (
              <li onClick={() => AddToPlaylist(item.id)} key={item.id}>
                <SongTitle>{item.name} </SongTitle>{item.artists[0].name}
                </li>
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
    box-sizing:border-box;
    border-radius: 5px;
    box-shadow: 0 0 10px #00000050;
  `
  const PlaylistTitle = styled.h3`
    background-color: #4fd75d;
    margin:0;
    padding: 10px 10px 10px 10px;
    color: #fff;
    font-size:28px;
    display: flex;
    border-radius: 5px 5px 0 0;

    align-content:center;
    align-items:center;
    img{
      margin-right: 10px;
      border-radius: 50%;

    }

  `

  const PlayListWrapper = styled.div`
   display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  color: #444;
  padding: 10px;
  align-items:top;
  justify-items: center;
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
            <PlayListWrapper>
              {playlists.map((item: items, index: any) => {
                return (
                  <PlayList key={item.id}>
                    <PlaylistCard>
                      <PlaylistTitle>
                     {item.images[2] && <img  alt={item.name} src={item.images[2].url} />}
                      {item.name}{" "}
                      </PlaylistTitle>
                      <TrackList getPlaylist={() => getPlaylist()} playlistID={item.id} href={item.tracks.href} token={token} />
                      <Search getPlaylist={() => getPlaylist()} playlistID={item.id} token={token} />
                    </PlaylistCard>
                  </PlayList>
                );
              })}
            </PlayListWrapper>
          </>
        )}
      </header>
    </div>
  );
}

export default FusedMusic;
