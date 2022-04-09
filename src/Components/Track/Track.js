import React from "react";
import "./Track.css";

export const Track = ({ track, isRemoval, action }) => {
  const trackAction = () => {
    action(track);
  };
  return (
    <div className="track-container">
      <div className="track-info">
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}{" "}
        </p>
      </div>

      <button className="track-action" onClick={trackAction}>
        <p>{isRemoval ? "-" : "+"}</p>
      </button>
    </div>
  );
};
