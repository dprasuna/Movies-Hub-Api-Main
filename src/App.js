import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import MainBody from "./components/MainBody";
import TvShows from "./components/TvShows";
import Series from "./components/Series";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  const [progress, setProgress] = useState(0);

  //variables
  //TMDB API EXTRA=> 389a21dc68984411fc806e8822b9bc15
  let TMBDApiKey = "389a21dc68984411fc806e8822b9bc15";
  //OMDB API EXTRA=>
  let OMBDApiKey = "491fd456";

  return (
    <>
      <BrowserRouter>
        <LoadingBar color="#f11946" progress={progress} />

        <Navbar title="MoviesBay" />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MainBody
                setProgress={setProgress}
                TMBDApiKey={TMBDApiKey}
                OMBDApiKey={OMBDApiKey}
              />
            }
          />
          <Route
            exact
            path="/movies"
            element={
              <Movies setProgress={setProgress} TMBDApiKey={TMBDApiKey} />
            }
          />
          <Route
            exact
            path="/tvshows"
            element={
              <TvShows setProgress={setProgress} TMBDApiKey={TMBDApiKey} />
            }
          />
          <Route
            exact
            path="/series"
            element={
              <Series setProgress={setProgress} TMBDApiKey={TMBDApiKey} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
