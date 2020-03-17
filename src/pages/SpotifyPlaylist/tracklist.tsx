import React, { useContext } from "react";
import axios from "axios";
import { Colors, Icon, useToast, FCTheme } from "@adamwebster/fused-components";
import styled from "styled-components";
import { PlaylistContext } from "./PlaylistContext";

const TrackListStyled = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    border-bottom: solid 1px
      ${props =>
        props.theme === "dark" ? Colors.darkModeMedium : Colors.border};
    &:last-child {
      border-bottom: none;
    }
  }
`;
const SongTitle = styled.div`
  font-weight: bold;
`;

const RemoveIcon = styled.span`
  display: inline-block;
  position: absolute;
  right: 10px;
  top: 20px;

  svg {
    color: ${Colors.red};
    position: relative;
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
`;

const ResultsImage = styled.img`
  width: 36px;
  float: left;
  margin-right: 10px;
  border-radius: 50%;
`;
const TrackList = () => {
  const playlistData = useContext(PlaylistContext);
  const toast = useToast();
  const theme = useContext(FCTheme);
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
      })
      .catch(err => {
        toast?.addDanger(err.toString());
      });
  };

  return (
    <TrackListStyled theme={theme?.theme}>
      {playlistData?.tracks.map(
        (item: { track: { name: string; id: string; artists: any; album: any } }) => {
          return (
            <li key={item.track.id}>
              <ResultsImage src={item.track.album.images[2].url} />
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

export default TrackList;
