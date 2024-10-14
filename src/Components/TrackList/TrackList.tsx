import React, { MouseEventHandler, useEffect, useState } from "react";
import { Track } from "../Track/Track";
import { TrackType } from "types";
import { List, ListItem, Typography } from "@mui/material";

type TracklistProps = {
  tracks: Array<TrackType>;
  selected: boolean;
};

const trackFeatures = [
  "Name",
  "Duration",
  "Danceability",
  "Acousticness",
  "Energy",
  "Instrumentalness",
  "Key",
  "Liveness",
  "Loudness",
  "Speechiness",
  "Time Signature",
  "Tempo",
  "Valence",
];

export const TrackFeature = ({
  feature,
  value,
  onClick,
}: {
  feature: string;
  value?: number | string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}) => {
  const getSize = (featureName: string) => {
    if (featureName === "Name") {
      return "25rem";
    } else if (
      ["Energy", "Key", "Tempo", "Valence", "Duration"].includes(featureName)
    ) {
      return "5rem";
    } else if (
      ["Liveness", "Loudness", "Danceability", "Acousticness"].includes(
        featureName
      )
    ) {
      return "7rem";
    } else {
      return "10rem";
    }
  };
  return (
    <Typography
      textAlign={"center"}
      color="white"
      sx={{
        minWidth: getSize(feature),
        overflowX: "scroll",
        "&:hover": { cursor: value ? "inherit" : "pointer" },
      }}
      onClick={onClick}
    >
      {!value && value !== 0
        ? feature
        : typeof value === "string"
        ? value
        : (value as number).toPrecision(3)}
    </Typography>
  );
};

const TrackList = ({ tracks, selected }: TracklistProps) => {
  const [sortedTracks, setSortedTracks] = useState<TrackType[]>(tracks);

  const handleSort: MouseEventHandler<HTMLSpanElement> = (event) => {
    const sortType = event.currentTarget.innerText;
    const sorted = [...tracks].sort((a: TrackType, b: TrackType) => {
      switch (sortType) {
        case "Name":
          return a.name > b.name ? -1 : 1;
        case "Duration":
          return a.features?.duration_ms! > b.features?.duration_ms! ? -1 : 1;
        case "Danceability":
          return a.features?.danceability! > b.features?.danceability! ? -1 : 1;
        case "Acousticness":
          return a.features?.acousticness! > b.features?.acousticness! ? -1 : 1;
        case "Energy":
          return a.features?.energy! > b.features?.energy! ? -1 : 1;
        case "Instrumentalness":
          return a.features?.instrumentalness! > b.features?.instrumentalness!
            ? -1
            : 1;
        case "Key":
          return a.features?.key! > b.features?.key! ? -1 : 1;
        case "Liveness":
          return a.features?.liveness! > b.features?.liveness! ? -1 : 1;
        case "Loudness":
          return a.features?.loudness! > b.features?.loudness! ? -1 : 1;
        case "Speechiness":
          return a.features?.speechiness! > b.features?.speechiness! ? -1 : 1;
        case "Time Signature":
          return a.features?.time_signature! > b.features?.time_signature!
            ? -1
            : 1;
        case "Tempo":
          return a.features?.tempo! > b.features?.tempo! ? -1 : 1;
        case "Valence":
          return a.features?.valence! > b.features?.valence! ? -1 : 1;
        case "Type":
          return a.features?.type! > b.features?.type! ? -1 : 1;
        default:
          return 0;
      }
    });
    setSortedTracks(sorted);
  };

  useEffect(() => {
    setSortedTracks(tracks);
  }, [tracks]);
  return (
    <List
      sx={{
        height: "21rem",
        overflowY: "scroll",
        overflowX: "scroll",
      }}
    >
      <ListItem key={"header"} sx={{ py: 1 }}>
        {trackFeatures.map((feature) => {
          return (
            <TrackFeature
              key={feature}
              feature={feature}
              onClick={handleSort}
            />
          );
        })}
      </ListItem>
      {sortedTracks.map((track, idx) => {
        return <Track key={idx} track={track} selected={selected} />;
      })}
    </List>
  );
};

export default TrackList;
