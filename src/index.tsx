import React from "react";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme } from "themes";
import { Application } from "Components/App/Application";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, productionStore } from "./store/productionStore";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainView } from "Components/views/MainView/MainView";
import { PlaylistView } from "Components/views/PlaylistView/PlaylistView";
import { TremorView } from "Components/views/Tremor/TremovView";

const container = document.getElementById("root");
const root = createRoot(container!);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Application />,
    children: [
      {
        path: "",
        element: <MainView />,
      },
      {
        path: "all-tracks",
        element: <PlaylistView />,
      },
      {
        path: "tremor",
        element: <TremorView />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={productionStore}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
