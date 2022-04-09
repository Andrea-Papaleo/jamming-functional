import React from "react";
import "./TrackListContainer.css";

const TrackListContainer = ({ children }) => {
  return <section className="tracklist-container">{children}</section>;
};

export default TrackListContainer;
