import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
// import { CssBaseline } from "@mui/material";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ThemeProvider theme={darkTheme}> */}
      {/* <CssBaseline /> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </Provider>
  </React.StrictMode>
);
