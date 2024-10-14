import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Close, OpenInNew } from "@mui/icons-material";
import Image from "mui-image";

import { PlaylistType, TrackType } from "types";
import { useSelector } from "react-redux";
import {
  selectAllTracks,
  selectToken,
  selectTracksByPlaylist,
  selectUser,
} from "store/selectors";
import TrackList from "Components/TrackList/TrackList";
import { useNavigate } from "react-router";

type PlaylistCardProps = {
  playlist: Partial<PlaylistType>;
};
export const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const playlistTracks = useSelector(selectTracksByPlaylist)(playlist.id!);
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <Grid item key={playlist.id} xs={12} sm={12} md={12} lg={selected ? 12 : 6}>
      <Paper
        elevation={16}
        sx={{
          mx: "auto",

          display: "flex",
          flexDirection: "column",
          backgroundColor: "black", //"#484848",
          p: 3,
          borderRadius: 6,
        }}
      >
        <Box
          position={"relative"}
          display="flex"
          alignItems={"center"}
          alignContent={"center"}
          paddingBottom={2}
          marginBottom={1}
          borderBottom={"2px solid grey"}
        >
          <Box
            position="absolute"
            top={0}
            right={0}
            color="white"
            sx={{ cursor: "pointer" }}
          >
            {!selected ? (
              <OpenInNew onClick={() => setSelected(true)} />
            ) : (
              <Close onClick={() => setSelected(false)} />
            )}
          </Box>
          {playlist.images!.length !== 0 && (
            <Image
              src={playlist.images![0].url}
              alt="random"
              width="85px"
              duration={0}
            />
          )}
          <Box display="flex" justifyContent="center" width="85%">
            <Typography variant="h5" component="h2" color="white">
              {playlist.name}
            </Typography>
          </Box>
        </Box>
        <TrackList tracks={playlistTracks} selected={selected} />
      </Paper>
    </Grid>
  );
};

export const AllTracksCard = () => {
  const tracks = useSelector(selectAllTracks);
  const navigate = useNavigate();

  const [selected, setSelected] = useState<boolean>(false);
  const navigateTo = () => {
    setSelected(true);
    navigate("/all-tracks");
  };

  return (
    <Grid item key={"allTracks"} xs={12} sm={12} md={12} lg={selected ? 12 : 6}>
      <Paper
        elevation={16}
        sx={{
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
          p: 3,
          borderRadius: 6,
        }}
      >
        <Box
          position={"relative"}
          display="flex"
          alignItems={"center"}
          alignContent={"center"}
          paddingBottom={1}
          marginBottom={1}
          borderBottom={"2px solid grey"}
        >
          <Box
            position="absolute"
            top={0}
            right={0}
            color="white"
            sx={{ cursor: "pointer" }}
          >
            {!selected ? (
              <OpenInNew onClick={navigateTo} />
            ) : (
              <Close onClick={() => setSelected(false)} />
            )}
          </Box>
          <Box display="flex" justifyContent="center" width="100%">
            <Typography variant="h5" component="h2" color="white">
              All Tracks
            </Typography>
          </Box>
        </Box>
        <TrackList tracks={tracks} selected={selected} />
      </Paper>
    </Grid>
  );
};

export const GeneratedPlaylistCard = ({
  playlistName,
  playlistTracks,
}: {
  playlistName: string;
  playlistTracks: TrackType[];
}) => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const savePlaylist = async () => {
    if (!user?.id) {
      return;
    }
    if (!playlistName) {
      return;
    }
    const trackURIs = playlistTracks.map((track) => track.uri);
    if (!trackURIs.length) {
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };

    const createPlaylistURL = `https://api.spotify.com/v1/users/${user.id}/playlists`;
    let playlistId;
    try {
      const response = await fetch(createPlaylistURL, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: playlistName }),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        playlistId = jsonResponse.id;
      }
    } catch (error) {
      console.log(error);
    }

    console.log(playlistId);
    // const stringURIs = trackURIs.reduce((string, track) => {
    //   return (string += track + ",");
    // }, "");

    const addSongsURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks/`;
    console.log(JSON.stringify({ uris: trackURIs, position: 0 }));
    console.log(trackURIs.slice(0, trackURIs.length / 2).length);
    if (trackURIs.length > 100) {
      try {
        await fetch(addSongsURL, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            uris: trackURIs.slice(0, trackURIs.length / 2),
            position: 0,
          }),
        });
        await fetch(addSongsURL, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            uris: trackURIs.slice(trackURIs.length / 2 + 1),
            position: 0,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await fetch(addSongsURL, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ uris: trackURIs, position: 0 }),
        });
      } catch (error) {
        console.log(error);
      }
    }

    return;
  };

  return (
    <Grid item key={playlistName} xs={12} sm={12} md={12} lg={6}>
      <Paper
        elevation={16}
        sx={{
          mx: "auto",

          display: "flex",
          flexDirection: "column",
          backgroundColor: "black", //"#484848",
          p: 3,
          borderRadius: 6,
        }}
      >
        <Box
          position={"relative"}
          display="flex"
          alignItems={"center"}
          alignContent={"center"}
          paddingBottom={2}
          marginBottom={1}
          borderBottom={"2px solid grey"}
        >
          <Box
            position="absolute"
            top={0}
            right={0}
            color="white"
            sx={{ cursor: "pointer" }}
          >
            <OpenInNew onClick={savePlaylist} />
          </Box>

          <Box display="flex" justifyContent="center" width="85%">
            <Typography variant="h5" component="h2" color="white">
              {playlistName}
            </Typography>
          </Box>
        </Box>
        <TrackList tracks={playlistTracks} selected={false} />
      </Paper>
    </Grid>
  );
};
