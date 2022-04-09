import React, { useState } from "react";
import "./Playlist.css";
import TrackListContainer from "../TrackListContainer/TrackListContainer";
import TrackList from "../TrackList/TrackList";
import { FaRegSave } from "react-icons/fa";
import Spotify from "../../utils/Spotify";

export const Playlist = ({ playlist, removeTrack }) => {
  const [playlistName, setPlaylistName] = useState("");
  console.log(playlist);

  const handleSave = async () => {
    const trackURIs = playlist.map((track) => track.uri);
    const response = await Spotify.savePlaylist(playlistName, trackURIs);
    alert(response);
  };
  return (
    <TrackListContainer>
      <input
        value={playlistName}
        className="playlist-title"
        placeholder="New Playlist"
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button className="save-button" onClick={handleSave}>
        <FaRegSave />
      </button>
      <TrackList tracks={playlist} isRemoval={true} action={removeTrack} />
    </TrackListContainer>
  );
};
