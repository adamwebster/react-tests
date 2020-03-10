import React, { useState, useContext } from "react";
import axios from "axios";
import { useToast, Autocomplete } from "@adamwebster/fused-components";
import styled from "styled-components";
import { PlaylistContext } from "./PlaylistContext";

const SearchWrapper = styled.div`
  position: relative;
  padding: 10px;
`;

const SearchResultsImage = styled.img`
  width: 36px;
  float: left;
  margin-right: 10px;
  border-radius: 50%;
`;

const Search = () => {
  const [results, setResults] = useState([] as any);
  const [data, setData] = useState([] as any);
  const playlistData = useContext(PlaylistContext);
  const toast = useToast();

  const searchForTrack = (e: { target: { value: string } }) => {
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
        const toSetItems = [] as any;
        response.data.tracks.items.forEach((item: any) => {
          toSetItems.push({
            name: item.name,
            artist: item.artists[0].name,
            image: item.album.images[2].url
          });
        });
        if (toSetItems.length > 0) {
          setData(toSetItems);
        }
        setResults(response.data.tracks.items);
      });
  };

  const AddToPlaylist = (trackID: string) => {
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
      <Autocomplete
        inputIcon="search"
        onInputChange={e => searchForTrack(e)}
        keyToSearch="name"
        placeholder="Search for a song title"
        onItemClick={index => AddToPlaylist(results[index].id)}
        itemFormatter={value => {
          return (
            <>
              <SearchResultsImage src={data[value].image} />
              <div>{data[value].name}</div>
              <div style={{ fontSize: "12px", color: "#aaa" }}>
                {data[value].artist}
              </div>
            </>
          );
        }}
        items={data}
      />
    </SearchWrapper>
  );
};

export default Search;
