/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Input,
  Card,
  Icon,
  Colors,
  DropdownButton,
  ToastProvider,
  useToast,
  Button
} from "@adamwebster/fused-components";
import styled from "styled-components";
import { PlaylistContextProvider, PlaylistContext } from "./PlaylistContext";
import { ExampleFooter } from "../../components/UI/ExampleFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  .reduce(function(initial: any, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

const TrackListStyled = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    border-bottom: solid 1px ${Colors.border};
  }
`;
const SongTitle = styled.div`
  font-weight: bold;
`;

const RemoveIcon = styled.span`
  display: inline-block;
  position: absolute;
  right:10px;
  top: 20px;

  svg {
    color: ${Colors.red};
    position: relative;
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
`;

const TrackList = () => {
  const playlistData = useContext(PlaylistContext);
  useEffect(() => {
    // getTracks(playlistData?.trackSource);
  }, [playlistData?.trackSource]);

  const RemoveFromPlaylist = (trackID: string) => {
    axios
      .delete(
        `https://api.spotify.com/v1/playlists/${playlistData?.selectedPlaylist}/tracks`,
        {
          data: { uris: [`spotify:track:${trackID}`] },
          headers: {
            Authorization: "Bearer " + playlistData?.token
          }
        }
      )
      .then(response => {
        playlistData?.getTracks(playlistData.trackSource);
      });
  };

  return (
    <TrackListStyled>
      {playlistData?.tracks.map(
        (item: { track: { name: string; id: string; artists: any } }) => {
          return (
            <li key={item.track.id}>
              <SongTitle>{item.track.name}</SongTitle>
              {item.track.artists[0].name}{" "}
              <RemoveIcon onClick={() => RemoveFromPlaylist(item.track.id)}>
                <Icon icon="times-circle" />
              </RemoveIcon>
            </li>
          );
        }
      )}
    </TrackListStyled>
  );
};

const StyledSearchMenu = styled.ul`
  background-color: #fff;
  padding: 0;
  margin: 0;
  list-style: none;
  position: absolute;
  border: solid 1px ${props => props.theme.borderColor};
  z-index: 9;
  width: calc(100% - 20px);
  box-sizing: border-box;
  box-shadow: 0 0 10px #00000050;
  top: 45px;
  border-radius: 5px;
  li {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: solid 1px ${props => props.theme.borderColor};
    &:last-child {
      border-bottom: 0;
    }
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  padding: 10px;
`;

const Search = () => {
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const playlistData = useContext(PlaylistContext);
  const toast = useToast();

  const searchForTrack = (e: { target: { value: string } }) => {
    setSearchValue(e.target.value);
    axios
      .get(
        `https://api.spotify.com/v1/search?q=${e.target.value}&type=track&market=US&limit=5`,
        {
          headers: {
            Authorization: "Bearer " + playlistData?.token
          }
        }
      )
      .then(response => {
        setResults(response.data.tracks.items);
      });
  };

  const AddToPlaylist = (trackID: string) => {
    setSearchValue("");
    const trackExists = playlistData?.tracks.filter(
      (track: any) => track.track.id === trackID
    );
    if (trackExists.length > 0) {
      toast?.addInfo(
        "Song already added",
        "You can't add the same song twice",
        { duration: 2 }
      );
      return false;
    }
    axios
      .post(
        `https://api.spotify.com/v1/playlists/${playlistData?.selectedPlaylist}/tracks`,
        {
          uris: [`spotify:track:${trackID}`]
        },
        {
          headers: {
            Authorization: "Bearer " + playlistData?.token
          }
        }
      )
      .then(response => {
        //    getPlaylist();
        playlistData?.getTracks(playlistData.trackSource);
      });
  };

  return (
    <SearchWrapper>
      <Input
        placeholder="Add an item"
        value={searchValue}
        onChange={e => searchForTrack(e)}
      />
      {searchValue.length > 0 && (
        <StyledSearchMenu>
          {results.length === 0 && <li>No Results Found</li>}
          {results.map((item: { name: string; id: string; artists: any }) => {
            return (
              <li onClick={() => AddToPlaylist(item.id)} key={item.id}>
                <SongTitle>{item.name} </SongTitle>
                {item.artists[0].name}
              </li>
            );
          })}
        </StyledSearchMenu>
      )}
    </SearchWrapper>
  );
};

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

        // setPlaylist(response.data.items);
        // let tracksURLToSave: any[] = [];
        // response.data.items.map((item: any) => {
        //   tracksURLToSave.push(item.tracks.href);
        // });
        // return tracksURLToSave;
      })
      .catch(err => {
        console.log(err);
        // if (err) {
        //   setToken("");
        //   localStorage.removeItem("FS_SPOTIFY_TOKEN");
        // }
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
              <ToastProvider>
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
