import { Box, Grid } from "@mui/material";
import { PlaylistCard } from "Components/PlaylistCard";
import { AllTracksCard } from "Components/PlaylistCard/PlaylistCard";
import React from "react";
import { PlaylistType } from "types";

type PlaylistGridProps = {
  playlists: PlaylistType[];
};
export const PlaylistGrid = ({ playlists }: PlaylistGridProps) => {
  return (
    <Box
      sx={{
        p: 8,
      }}
    >
      <Grid container spacing={4}>
        {playlists.map((playlist, idx) => (
          <PlaylistCard playlist={playlist} key={playlist.id} />
        ))}
        {playlists.length > 0 && <AllTracksCard />}
      </Grid>
    </Box>
  );
};
