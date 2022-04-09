import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track";

const TrackList = ({ tracks, action, isRemoval }) => {
  return (
    <div className="track-list">
      {tracks.map((track, idx) => {
        return (
          <Track
            key={idx}
            track={track}
            isRemoval={isRemoval}
            action={action}
          />
        );
      })}
    </div>
  );
};

export default TrackList;
