import React from "react";
import { AppBar, Box, ButtonBase, Toolbar, Typography } from "@mui/material";
import { GraphicEqRounded as GraphicEqRoundedIcon } from "@mui/icons-material";

type MainAppBarProps = {
  username: string | undefined;
  hasToken: boolean;
  handleLogIn: () => void;
  handleLogOut: () => void;
};
export const MainAppBar = ({
  username,
  hasToken,
  handleLogIn,
  handleLogOut,
}: MainAppBarProps) => {
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          backgroundColor: "#000",
          justifyContent: "space-between",
        }}
      >
        <Box
          display="flex"
          width="33%"
          flexGrow={1}
          justifyContent="flex-start"
        >
          <ButtonBase sx={{ color: "white" }}>
            <GraphicEqRoundedIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Playlist Explorer
            </Typography>
          </ButtonBase>
        </Box>
        <Box display="flex" width="33%" flexGrow={1} justifyContent="center">
          {username && (
            <Typography color="inherit" noWrap>
              {`Hi, ${username}`}
            </Typography>
          )}
        </Box>
        <Box display="flex" width="33%" flexGrow={1} justifyContent="flex-end">
          <ButtonBase
            sx={{
              px: 1,
              py: 1,
              borderRadius: 5,
              transition: "all ease-in-out 0.2s",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                transition: "all ease-in-out 0.2s",
              },
            }}
            onClick={hasToken ? handleLogOut : handleLogIn}
          >
            <Typography color="inherit" noWrap>
              {!hasToken ? "LOG IN" : "LOG OUT"}
            </Typography>
          </ButtonBase>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
