import { createSelector } from "@reduxjs/toolkit";
import { DataState, PlaylistType, TrackType } from "types";
import { TrackMetricType } from "types/TrackType";

export function getProperty<T, S extends keyof T>(
  entity: T,
  property: S
): T[S] {
  return entity[property];
}

// selectIds,
//       selectEntities,
//       selectAll,
//       selectTotal,
//       selectById: createDraftSafeSelector(
//         selectEntities,
//         selectId,
//         selectById
//       ),

export const selectToken = ({ data }: { data: DataState }) => {
  return data.token;
};

export const selectLoading = ({ data }: { data: DataState }) => {
  return data.isLoading;
};
export const selectFetchState = ({ data }: { data: DataState }) => {
  return data.fetchState;
};

export const selectStatus = ({ data }: { data: DataState }) => {
  return data.status;
};
export const selectUser = ({ data }: { data: DataState }) => {
  return data.user;
};
export const selectUserDisplayName = ({ data }: { data: DataState }) => {
  return data.user?.display_name;
};

const selectId = (_: unknown, id: string) => id;
// Playlists

export const selectPlaylistIds = ({ data }: { data: DataState }): string[] => {
  return data.playlists.ids;
};
export const selectPlaylistEntities = ({
  data,
}: {
  data: DataState;
}): Record<string, PlaylistType> => {
  return data.playlists.entities;
};
export const selectAllPlaylists = createSelector(
  selectPlaylistEntities,
  (entities): PlaylistType[] => {
    return Object.values(entities);
  }
);

export const selectPlaylistTotal = createSelector(
  selectPlaylistIds,
  (ids): number => {
    return ids.length;
  }
);

// Tracks

export const selectTrackIds = ({ data }: { data: DataState }): string[] => {
  return data.tracks.ids;
};
export const selectPlaylistById = createSelector(
  [selectPlaylistEntities, selectTrackIds],
  (playlistEntities, allTrackIds): ((id: string) => Partial<PlaylistType>) =>
    (id: string) => {
      if (id === "all-tracks") {
        return {
          id: "all-tracks",
          name: "All Tracks",
          images: [],
        };
      }
      return playlistEntities[id];
    }
);
export const selectTrackEntities = ({
  data,
}: {
  data: DataState;
}): Record<string, TrackType> => {
  return data.tracks.entities;
};
export const selectAllTracks = createSelector(
  selectTrackEntities,
  (entities): TrackType[] => {
    return Object.values(entities);
  }
);

export const selectTrackTotal = createSelector(
  selectTrackIds,
  (ids): number => {
    return ids.length;
  }
);
export const selectTrackById = createSelector(
  [selectTrackEntities, selectId],
  (trackEntities, id): TrackType => {
    return trackEntities[id];
  }
);

export const selectTrackIdsByPlaylistObject = ({
  data,
}: {
  data: DataState;
}): Record<string, string[]> => {
  return data.tracksByPlaylist;
};

export const selectTracksByIds = createSelector(
  [selectTrackEntities],
  (trackEntities): ((ids: string[]) => TrackType[]) =>
    (ids: string[]) => {
      const tracks = [];
      for (const id of ids) {
        const track = trackEntities[id];
        if (track) {
          tracks.push(track);
        }
      }
      return tracks;
    }
);

export const selectTracksByPlaylist = createSelector(
  [selectTrackIdsByPlaylistObject, selectTracksByIds, selectAllTracks],
  (tracksByPlaylist, tracksByIds, allTracks) =>
    (playlistId: string): TrackType[] => {
      if (playlistId === "all-tracks") {
        return allTracks;
      }
      const trackIds = tracksByPlaylist[playlistId];
      if (!trackIds) return [];
      return tracksByIds(trackIds);
    }
);

export const selectPlaylistPlotData = createSelector(
  [selectTracksByPlaylist],
  (tracksByPlaylist) => {
    return (playlistId: string) => {
      const tracks = tracksByPlaylist(playlistId);

      const subjects: Array<keyof TrackMetricType> = [
        "danceability",
        "acousticness",
        "energy",
        "instrumentalness",
        "liveness",
        "loudness",
        "valence",
      ];

      const data = [];

      for (const sub of subjects) {
        data.push({
          subject: sub,
          value: 0,
          fullMark: 1,
        });
      }

      for (const track of tracks) {
        const features = track.features;
        if (!features) return [];
      }
    };
  }
);

// export const selectTracksByPlaylist = createSelector(
//   [selectPlaylists,selectTracks, (state: DataState, playlistId: string) => playlistId],
//   (playlists: PlaylistType[],tracks:TrackType[], playlistId: string) => {
//     let trackIds:string[] | undefined
//     for (const playlist of playlists) {
//       if (playlist.id === playlistId) {
//         trackIds =  playlist.tracks.ids;
//       }
//     }
//     if(!trackIds){
//       return [];
//     }

//   }
// );
