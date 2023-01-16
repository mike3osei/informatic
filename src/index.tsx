import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter";
import React from "react";
import ReactDOM from "react-dom/client";
import ClassroomProvider from "src/context/classroom";
import theme from "src/styles/theme";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ClassroomProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ClassroomProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
