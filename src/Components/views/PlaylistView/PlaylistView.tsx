import { Box, Button } from "@mui/material";
import { PlaylistCard } from "Components/PlaylistCard";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { selectPlaylistById, selectTracksByPlaylist } from "store/selectors";
import { TrackType } from "types";
import * as KMeans from "ml-kmeans";
import { GeneratedPlaylistCard } from "Components/PlaylistCard/PlaylistCard";
import { PlaylistRadarChart } from "Components/PlaylistRadarChart/PlaylistRadarChart";

export const PlaylistView = () => {
  const location = useLocation();
  const playlist = useSelector(selectPlaylistById)(location.pathname.slice(1));
  const tracks = useSelector(selectTracksByPlaylist)(playlist.id!);
  const [newPlaylists, setNewPlaylists] = useState<TrackType[][]>([]);

  const getNormalizedData = (tracks: TrackType[]) => {
    let audioFeatures: number[][] = [];
    let maxTempo = 1;
    for (const track of tracks) {
      if (track.features?.tempo! > maxTempo) {
        maxTempo = track.features?.tempo!;
      }
    }
    for (const track of tracks) {
      const features: number[] = [];
      for (const [feature, value] of Object.entries(track.features!)) {
        switch (feature) {
          case "acousticness":
            features.push(value as number);
            break;
          case "danceability":
            features.push(value as number);
            break;
          case "energy":
            features.push(value as number);
            break;
          case "key":
            features.push(((value as number) + 1) / 12);
            break;
          case "loudness":
            features.push((-1 * (value as number)) / 60);
            break;
          case "mode":
            features.push(value as number);
            break;
          case "tempo":
            features.push((value as number) / maxTempo);
            break;
          case "time_signiture":
            features.push(((value as number) - 3) / 4);
            break;
          case "valence":
            features.push(value as number);
        }
      }
      audioFeatures.push(features);
    }
    return audioFeatures;
  };

  const getDist = (val1: number[], val2: number[]) => {
    let sqDist: number = 0;
    for (let i = 0; i < val1.length; i++) {
      sqDist += (val2[i] - val1[i]) ** 2;
    }
    return Math.sqrt(sqDist);
  };

  const getInitialCentroids = (data: number[][], k: number) => {
    const centroids = [data[0]];

    for (let _ = 0; _ < k - 1; _++) {
      let currentDist = 0;
      let currentDatum = data[0];
      for (const datum of data) {
        let smallest = Infinity;
        for (const centroid of centroids) {
          const dist = getDist(centroid, datum);
          smallest = dist < smallest ? dist : smallest;
        }
        if (smallest > currentDist) {
          currentDist = smallest;
          currentDatum = datum;
        }
      }
      centroids.push(currentDatum);
    }
    return centroids;
  };
  const generate = () => {
    const k = 7;
    const audioFeatures = getNormalizedData(tracks);
    const initCentroids = getInitialCentroids(audioFeatures, k);
    console.log(initCentroids);

    // Apply K-means clustering
    const results = KMeans.kmeans(audioFeatures, k, {
      initialization: initCentroids,
    });
    console.log("Cluster centroids:");
    console.log(results);
    const clusters = results.clusters;
    const newPlaylists: TrackType[][] = [];
    for (let i = 0; i < k; i++) {
      newPlaylists.push([]);
    }
    for (let i = 0; i < clusters.length; i++) {
      newPlaylists[clusters[i]].push(tracks[i]);
    }
    setNewPlaylists(newPlaylists);
  };

  return (
    <>
      <Box
        component="main"
        position="relative"
        top="64px"
        py={4}
        height={`${window.innerHeight - 128}px `}
        overflow={"scroll"}
        paddingX={2}
      >
        <PlaylistCard playlist={playlist} key={playlist.id} />
        <Button onClick={generate}>Generate</Button>
        {newPlaylists.map((playlist, idx) => {
          return (
            <GeneratedPlaylistCard
              key={`K-Means from liked ${idx + 1}`}
              playlistName={`K-Means from liked ${idx + 1}`}
              playlistTracks={playlist}
            />
          );
        })}
      </Box>
      <PlaylistRadarChart />
    </>
  );
};
