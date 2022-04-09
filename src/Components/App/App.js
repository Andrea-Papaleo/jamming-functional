import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../utils/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const search = useCallback(async (searchTerm) => {
    const results = await Spotify.search(searchTerm);
    setSearchResults(results);
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const accessTokenMatch = url.match(/access_token=([^&]*)/);
    const expiresInMatch = url.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      search();
    }
  }, [search]);

  const addTrack = (selectedTrack) => {
    let playlistTracks = playlist;
    if (playlistTracks.find((track) => track.id === selectedTrack.id)) {
      return;
    }
    //playlistTracks.push(selectedTrack);
    console.log(playlistTracks);
    setPlaylist([...playlistTracks, selectedTrack]);
    console.log(playlist);
    console.log("---");
  };
  const removeTrack = (selectedTrack) => {
    let playlistTracks = playlist.filter(
      (track) => track.id !== selectedTrack.id
    );
    setPlaylist(playlistTracks);
  };

  return (
    <div>
      <h1>
        Ja<span>mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="playlists-container">
          <SearchResults searchResults={searchResults} addTrack={addTrack} />
          <Playlist playlist={playlist} removeTrack={removeTrack} />
        </div>
      </div>
    </div>
  );
}

export default App;
