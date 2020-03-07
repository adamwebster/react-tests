import React, {  useState, useContext } from "react";
import axios from "axios";
import {
  Input,
  useToast,
} from "@adamwebster/fused-components";
import styled from "styled-components";
import { PlaylistContext } from "./PlaylistContext";

const SongTitle = styled.div`
  font-weight: bold;
`;


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
    toast?.addDanger(
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

export default Search;