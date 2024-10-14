import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// A custom theme for this app

const theme = createTheme({});
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "100vw",
          height: "100vh",
          [theme.breakpoints.up("lg")]: {
            maxWidth: "100vw",
          },
          [theme.breakpoints.up("md")]: {
            padding: 0,
          },
        },
      },
    },
  },
});
