import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { FetchState, PlaylistType, TrackType, User } from "types";
import { Album } from "types/Album";
import { DataState } from "types/DataState";

// Define a type for the slice state

export const playlistAdapter = createEntityAdapter<PlaylistType>();
export const trackAdapter = createEntityAdapter<TrackType>();
export const albumAdapter = createEntityAdapter<Album>();

const initialState: DataState = {
  token: undefined,
  isLoading: false,
  fetchState: FetchState.initial,
  status: undefined,
  playlists: { ids: [], entities: {} },
  albums: { ids: [], entities: {} },
  user: undefined,
  tracks: { ids: [], entities: {} },
  tracksByPlaylist: {},
};

export const dataSlice = createSlice({
  name: "data",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset(state, action: PayloadAction<{}>) {
      Object.assign(state, dataSlice.getInitialState());
    },
    resetMusicData(state, action: PayloadAction<{}>) {
      const { token, user, ...musicData } = dataSlice.getInitialState();
      Object.assign(state, musicData);
    },
    setToken(
      state,
      action: PayloadAction<{
        token?: string;
      }>
    ) {
      state.token = action.payload.token;
    },
    setLoading(
      state,
      action: PayloadAction<{
        isLoading: boolean;
      }>
    ) {
      state.isLoading = action.payload.isLoading;
    },
    setFetchState(
      state,
      action: PayloadAction<{
        fetchState: FetchState;
      }>
    ) {
      state.fetchState = action.payload.fetchState;
    },
    setStatus(
      state,
      action: PayloadAction<{
        status: string;
      }>
    ) {
      state.status = action.payload.status;
    },
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    addPlaylist: (state, action: PayloadAction<{ playlist: PlaylistType }>) => {
      const { playlist } = action.payload;
      if (playlist.id in state.playlists.entities) return;
      state.playlists.ids.push(playlist.id);
      state.playlists.entities[playlist.id] = playlist;
      state.tracksByPlaylist[playlist.id] = playlist.tracks.ids ?? [];
    },
    addPlaylists: (
      state,
      action: PayloadAction<{ playlists: PlaylistType[] }>
    ) => {
      for (const playlist of action.payload.playlists) {
        dataSlice.caseReducers.addPlaylist(state, {
          type: "addPlaylist",
          payload: { playlist },
        });
      }
    },
    addTrack: (state, action: PayloadAction<{ track: TrackType }>) => {
      const { track } = action.payload;
      if (track.id in state.tracks.entities) return;
      state.tracks.ids.push(track.id);
      state.tracks.entities[track.id] = track;
    },
    addTracks: (state, action: PayloadAction<{ tracks: TrackType[] }>) => {
      for (const track of action.payload.tracks) {
        dataSlice.caseReducers.addTrack(state, {
          type: "addTrack",
          payload: { track },
        });
      }
    },
    addAlbum: (state, action: PayloadAction<{ album: Album }>) => {
      const { album } = action.payload;
      if (album.id in state.albums.entities) return;
      state.albums.ids.push(album.id);
      state.albums.entities[album.id] = album;
    },
    addAlbums: (state, action: PayloadAction<{ albums: Album[] }>) => {
      for (const album of action.payload.albums) {
        dataSlice.caseReducers.addAlbum(state, {
          type: "addAlbum",
          payload: { album },
        });
      }
    },
  },
});

export const {
  setLoading,
  setUser,
  addPlaylist,
  addPlaylists,
  addTrack,
  addTracks,
} = dataSlice.actions;
