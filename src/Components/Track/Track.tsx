import React from "react";
import { Box, ListItem, Typography } from "@mui/material";
import { TrackType } from "types";
import { TrackFeature } from "Components/TrackList/TrackList";

type trackProps = {
  track: TrackType;
  selected: boolean;
};
// const extractions: Record<string, number | string> = {
//   danceability: 0,
//   energy: 0,
//   key: 0,
//   loudness: 0,
//   mode: 0,
//   speechiness: 0,
//   acousticness: 0,
//   instrumentalness: 0,
//   liveness: 0,
//   valence: 0,
//   tempo: 0,
//   type: ",",
//   duration_ms: 0,
//   time_signature: 0,
// };

const getMMSSFromMS = (ms: number) => {
  const seconds = ms / 1000;
  const minutes = Math.floor(seconds / 60);
  const secondsRem = Math.round(seconds % 60);

  return `${minutes}:${secondsRem}`;
};

export const Track = ({ track, selected }: trackProps) => {
  return (
    <ListItem key={track.id} sx={{ py: 1 }}>
      <Box
        sx={{
          maxWidth: "25rem",
          minWidth: "25rem",
          width: "25rem",
          overflowX: "scroll",
        }}
      >
        <Typography color="white">{track.name}</Typography>
        <Typography color="#aaa" fontSize={12}>
          {track.artists[0].name}
        </Typography>
      </Box>
      <TrackFeature
        feature="Duration"
        value={getMMSSFromMS(track.features?.duration_ms!)}
      />
      <TrackFeature
        feature="Danceability"
        value={track.features?.danceability!}
      />
      <TrackFeature
        feature="Acousticness"
        value={track.features?.acousticness!}
      />
      <TrackFeature feature="Energy" value={track.features?.energy!} />
      <TrackFeature
        feature="Instrumentalness"
        value={track.features?.instrumentalness! ?? 0}
      />
      <TrackFeature feature="Key" value={track.features?.key!} />
      <TrackFeature feature="Liveness" value={track.features?.liveness!} />
      <TrackFeature feature="Loudness" value={track.features?.loudness!} />
      <TrackFeature
        feature="Speechiness"
        value={track.features?.speechiness!}
      />
      <TrackFeature
        feature="Time Signiture"
        value={track.features?.time_signature!}
      />
      <TrackFeature feature="Tempo" value={track.features?.tempo!} />
      <TrackFeature feature="Valence" value={track.features?.valence!} />
    </ListItem>
  );
};
