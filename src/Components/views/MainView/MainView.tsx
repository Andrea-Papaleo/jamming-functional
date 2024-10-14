import axios from "axios";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { useAppDispatch } from "hooks/storeHooks";

import { Hero } from "Components/Hero";
import { PlaylistGrid } from "Components/PlaylistGrid";

import { dataSlice } from "store/dataSlice";
import {
  selectFetchState,
  selectAllPlaylists,
  selectStatus,
  selectToken,
} from "store/selectors";

import { FetchState, PlaylistType } from "types";

export function MainView() {
  const token = useSelector(selectToken);
  const playlists = useSelector(selectAllPlaylists);
  const fetchState = useSelector(selectFetchState);
  const status = useSelector(selectStatus);
  const dispatch = useAppDispatch();

  const handleFetchPlaylists = async () => {
    dispatch(dataSlice.actions.resetMusicData({}));
    dispatch(
      dataSlice.actions.setFetchState({
        fetchState: FetchState.playlistInfo,
      })
    );
    let playlists: PlaylistType[] = [];
    try {
      let { data: playlistData } = await axios.get(
        "https://api.spotify.com/v1/me/playlists?limit=50&offset=0",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      playlists = playlistData.items as PlaylistType[];
    } catch (error) {
      console.log("Error fetching playlists...");
      console.log(error);
    }

    //TODO: keep gathering after 100 limit

    try {
      for await (const playlist of playlists) {
        let { data: playlistTracks } = await axios.get(playlist.tracks.href, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        playlist.tracks.ids = playlistTracks.items.map(
          (item: any) => item.track.id
        );
      }

      dispatch(dataSlice.actions.addPlaylists({ playlists: playlists }));
    } catch (error) {
      console.log("Error fetching playlist tracks...");
      console.log(error);
    }
  };
  const handleFetchUserStats = async () => {
    try {
      let { data: topData } = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(topData);
    } catch (error) {
      console.log("Error fetching top track...");
      console.log(error);
    }
  };

  return (
    <Box
      component="main"
      position="relative"
      top="64px"
      py={4}
      height={`${window.innerHeight - 128}px `}
      overflow={"scroll"}
    >
      <Hero
        status={status}
        fetchState={fetchState}
        token={token}
        handleFetchPlaylists={handleFetchPlaylists}
        handleFetchTopTracks={handleFetchUserStats}
      />
      <PlaylistGrid playlists={playlists} />
    </Box>
  );
}
