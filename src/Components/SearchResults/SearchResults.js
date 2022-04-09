import React from "react";
import "./SearchResults.css";
import TrackListContainer from "../TrackListContainer/TrackListContainer";
import TrackList from "../TrackList/TrackList";

export const SearchResults = ({ searchResults, addTrack }) => {
  return (
    <TrackListContainer>
      <h2 className="search-results-title">Results</h2>
      <TrackList tracks={searchResults} action={addTrack}></TrackList>
    </TrackListContainer>
  );
};
