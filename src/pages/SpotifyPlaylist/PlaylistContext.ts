import React from "react";

export interface PlaylistInterface {
  playlists: any;
  tracks: any;
  trackSource: string;
  token: string;
  selectedPlaylist?: string;
  playlist: any;
  getTracks: (h: any) => void;
}

export const PlaylistContext = React.createContext<PlaylistInterface | null>(
  null
);

export const PlaylistContextProvider = PlaylistContext.Provider;

export const PlaylistContextConsumer = PlaylistContext.Consumer;
