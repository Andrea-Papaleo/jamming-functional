import React, { ReactNode } from "react";
import "./TrackListContainer.css";

const TrackListContainer = ({ children }: { children: ReactNode }) => {
  return <section className="tracklist-container">{children}</section>;
};

export default TrackListContainer;
