import { productionStore } from "store/productionStore";
import { PlaylistType } from "./PlaylistType";
import { TrackType } from "./TrackType";
import { User } from "./User";
import { Album } from "./Album";
import { FetchState } from "./FetchState";

export interface DataState {
  token: string | undefined;
  isLoading: boolean;
  fetchState: FetchState;
  status?: string;
  playlists: { ids: string[]; entities: Record<string, PlaylistType> };
  albums: { ids: string[]; entities: Record<string, Album> };
  user: User | undefined;
  tracks: { ids: string[]; entities: Record<string, TrackType> };
  tracksByPlaylist: Record<string, string[]>;
}

export type RootState = ReturnType<typeof productionStore.getState>;
export type AppDispatch = typeof productionStore.dispatch;
