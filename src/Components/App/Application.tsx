import { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";

import { MainAppBar } from "Components/MainAppBar";
import { Footer } from "Components/Footer";

import { useAppDispatch } from "hooks/storeHooks";

import { dataSlice } from "store/dataSlice";
import { selectToken, selectUserDisplayName } from "store/selectors";
//I will change
const CLIENT_ID = "9430888836e442498651ef2b1f0c0df9";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE =
  "user-library-read user-library-modify user-read-email user-read-private playlist-modify-public playlist-modify-private";

export function Application() {
  const token = useSelector(selectToken);
  const userName = useSelector(selectUserDisplayName);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogOut = useCallback(() => {
    dispatch(dataSlice.actions.reset({}));
    window.localStorage.removeItem("token");
  }, [dispatch]);

  const handleLogIn = useCallback(() => {
    window.open(
      `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`,
      "_self",
      "noreferrer"
    );
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(dataSlice.actions.setUser({ user: data }));
      } catch (err) {
        console.log(err);
        //handleLogOut();
      }
    };
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token") ?? undefined;

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))!
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    dispatch(dataSlice.actions.setToken({ token: token }));

    if (token) {
      getUserInfo();
    }
  }, [dispatch, handleLogIn, handleLogOut]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Container
      sx={{
        bgcolor: "#4158D0",
        backgroundImage:
          "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        maxWidth: "100vw",
        minHeight: "100vh",
        px: 0,
        overflowY: "scroll",
        "@media (min-width: 1200px)": {
          maxWidth: "100vw",
        },
        "@media (min-width: 600px)": {
          px: 0,
        },
      }}
    >
      <MainAppBar
        username={userName}
        hasToken={!!token}
        handleLogIn={handleLogIn}
        handleLogOut={handleLogOut}
      />
      <Outlet />

      <Footer />
    </Container>
  );
}
