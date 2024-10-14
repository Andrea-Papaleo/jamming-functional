import { Box, Button, Stack, Typography } from "@mui/material";

type HeroProps = {
  status?: string;
  fetchState?: string;
  token?: string;
  handleFetchPlaylists: () => void;
  handleFetchTopTracks?: () => void;
};
export const Hero = ({
  status,
  fetchState,
  token,
  handleFetchPlaylists,
  handleFetchTopTracks,
}: HeroProps) => {
  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ p: 2 }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Playlists
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        {fetchState}
      </Typography>
      {status && (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          {status}
        </Typography>
      )}
      {token && (
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={handleFetchPlaylists}>
            Import Playlists
          </Button>
          {handleFetchTopTracks && (
            <Button variant="contained" onClick={handleFetchTopTracks}>
              Top Tracks
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
};
