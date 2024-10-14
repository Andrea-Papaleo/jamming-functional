import { dataSlice } from "store/dataSlice";
import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { TypedStartListening, TypedAddListener } from "@reduxjs/toolkit";
import axios from "axios";
import { TrackType, AppDispatch, RootState, Album, FetchState } from "types";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

startAppListening({
  actionCreator: dataSlice.actions.addPlaylists,
  effect: async (action, listenerAPI) => {
    console.log("listener started...");
    listenerAPI.dispatch(
      dataSlice.actions.setFetchState({ fetchState: FetchState.trackInfo })
    );
    const tracks: TrackType[] = [];
    const token = listenerAPI.getState().data.token;
    const playlists = action.payload.playlists;

    for (const playlist of playlists) {
      let next: string | null = playlist.tracks.next;

      if (next === null) {
        playlist.tracks.items.forEach((item) => tracks.push(item.track));
        listenerAPI.dispatch(
          dataSlice.actions.setFetchState({
            fetchState: FetchState.trackFeatures,
          })
        );
      } else {
        try {
          while (next !== null) {
            let { data }: any = await axios.get(next!, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            next = data.next;

            tracks.push(...data.items.map((item: any) => item.track));
          }
          listenerAPI.dispatch(
            dataSlice.actions.setFetchState({
              fetchState: FetchState.trackFeatures,
            })
          );
        } catch (error) {
          console.log("Error fetching liked tracks");
          console.log(error);
        }
      }

      let i = 0;
      let j = 0;
      const trackUrls: string[] = [];

      for (const track of tracks) {
        if (i === 100) {
          i = 0;
          j += 1;
        }
        if (trackUrls.length === j) {
          trackUrls.push(track.id);
        } else {
          trackUrls[j] += `,${track.id}`;
        }
        i++;
      }
      const allTrackFeatures = [];
      try {
        for await (const tracks of trackUrls) {
          let { data: trackFeatures } = await axios.get(
            `https://api.spotify.com/v1/audio-features?ids=${tracks}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          allTrackFeatures.push(...trackFeatures["audio_features"]);
        }
      } catch (error) {
        console.log("Error fetching track features...");
        console.log(error);
      }

      for (let i = 0; i < allTrackFeatures.length; i++) {
        tracks[i].features = allTrackFeatures[i];
      }
      listenerAPI.dispatch(dataSlice.actions.addTracks({ tracks: tracks }));

      listenerAPI.dispatch(
        dataSlice.actions.setFetchState({ fetchState: FetchState.albumInfo })
      );
      try {
        let { data: albumData } = await axios.get(tracks[0].album.href, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        listenerAPI.dispatch(
          dataSlice.actions.addAlbum({ album: albumData as Album })
        );
      } catch (error) {
        console.log("Error fetching albums");
        console.log(error);
      }
    }
  },
});
