import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./reset.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import { TourProvider } from "@reactour/tour";

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TourProvider
          scrollSmooth
          onClickClose={({ setCurrentStep, setIsOpen }) => {
            setIsOpen(false);
            localStorage.setItem("tourShown", "true");
            setCurrentStep(0);
          }}
          onClickMask={({ setCurrentStep, currentStep, steps }) => {
            if (steps && currentStep !== steps.length - 1) {
              setCurrentStep(s => s + 1);
            }
          }}
          styles={{
            popover: base => ({
              ...base,
              "--reactour-accent": "black",
              borderRadius: 10,
              paddingTop: 30,
              whiteSpace: "pre-wrap",
              lineHeight: 2,
              maxWidth: isMobile() ? "70vw" : "25vw",
              maxHeight: isMobile() ? "300px" : "auto",
            }),
            maskArea: base => ({ ...base, rx: 10 }),
            maskWrapper: base => ({ ...base, color: "black" }),
            badge: base => ({ ...base, left: "auto", right: "-0.8125em" }),
            controls: base => ({ ...base, marginTop: 100 }),
            close: base => ({
              ...base,
              right: "auto",
              left: 8,
              top: 8,
              fontSize: 10,
            }),
          }}
        >
          <App />
        </TourProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
