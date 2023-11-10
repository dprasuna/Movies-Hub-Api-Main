import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";

export default function MainBody(props) {
  const [trending, setTrending] = useState([]);
  const [videos, setVideos] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isThisWeekActive, setIsThisWeekActive] = useState(false);
  const [isMoviesActive, setIsMoviesActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);

  const updateTrending = async () => {
    props.setProgress(10);
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${props.TMBDApiKey}`;
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(50);
    setTrending(parseData.results);
    props.setProgress(100);
  };

  const updateVideos = async () => {
    const url = `https://api.themoviedb.org/3/movie/335977/videos?api_key=${props.TMBDApiKey}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setVideos(parseData.results);
  };

  const updatePopular = async () => {
    props.setProgress(10);
    const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${props.TMBDApiKey}`;
    let data = await fetch(url);
    props.setProgress(50);
    let parseData = await data.json();
    setPopular(parseData.results);
    props.setProgress(100);
  };

  const handleClickThisWeek = async () => {
    setIsThisWeekActive(true);
    props.setProgress(10);
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${props.TMBDApiKey}`;
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(50);
    setTrending(parseData.results);
    props.setProgress(100);
  };

  const handleClickTop = async () => {
    setIsThisWeekActive(false);
    updateTrending();
  };

  const handleClickMovies = async () => {
    setIsMoviesActive(true);
    props.setProgress(10);
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${props.TMBDApiKey}`;
    let data = await fetch(url);
    props.setProgress(40);
    let parseData = await data.json();
    setPopular(parseData.results);
    props.setProgress(100);
  };

  const handleClickTvSeries = async () => {
    setIsMoviesActive(false);
    updatePopular();
  };

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchKeyword.trim() === "") {
      setSearchResults([]);
      return;
    }
    props.setProgress(10);
    const url = `https://www.omdbapi.com/?s=${searchKeyword}&page=1&apikey=${props.OMBDApiKey}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(60);
    if (parseData.Response === "True") {
      setSearchResults(parseData.Search);
    } else {
      setSearchResults([]);
    }
    props.setProgress(100);
  };

  const handleClickOutside = (event) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target)
    ) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    updateTrending();
    updateVideos();
    updatePopular();
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <main id="main-body">
        <div className="top-header">
          <div className="heading">
            <h1>Welcome.</h1>
            <h3>
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>
          </div>
          <div className="search-box">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="search"
                className="search-bar"
                placeholder="Search..."
                value={searchKeyword}
                onChange={handleSearchInputChange}
              />
              <input type="submit" className="submit-btn" value="Search" />
            </form>
            {searchResults.length > 0 && (
              <div className="search-results" ref={searchResultsRef}>
                {searchResults.map((element) => (
                  <a
                    href={`https://www.imdb.com/title/${element.imdbID}`}
                    key={element.imdbID}
                  >
                    <div className="search-result-card">
                      <div className="search-result-image">
                        <img src={element.Poster} alt="" />
                      </div>
                      <div className="search-result-title">
                        {element.Title}
                        <p className="search-result-date">{element.Year}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="movies-card-box trending">
          <div className="trending-header common-header">
            <h2>Trending</h2>
            <div className="moive-btn">
              <div
                className={`btn1 m-btn ${!isThisWeekActive ? "active" : ""}`}
                onClick={handleClickTop}
              >
                <span>Today</span>
              </div>
              <div
                className={`btn2 m-btn ${isThisWeekActive ? "active" : ""}`}
                onClick={handleClickThisWeek}
              >
                <span>This Week</span>
              </div>
            </div>
          </div>
          <div className="moive-content">
            {trending.map((element) => {
              return (
                <a
                  href={`https://www.themoviedb.org/movie/${element.id}`}
                  key={element.id}
                >
                  <div className="moive-card">
                    <div className="card-image">
                      <img
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face${element.poster_path}`}
                        alt=""
                      />
                    </div>
                    <div className="movie-title">{element.original_title}</div>
                    <p className="movie-date">{element.release_date}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div className="videos">
          <div className="videos-header common-header">
            <h2>Movies Previews</h2>
          </div>
          <div className="videos-content">
            {videos.map((element) => {
              return (
                <div className="videos-card" key={element.id}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${element.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })}
          </div>
        </div>
        <div className="popular">
          <div className="common-header">
            <h2>Watch Popular</h2>
            <div className="moive-btn">
              <div
                className={`btn1 m-btn ${!isMoviesActive ? "active" : ""}`}
                onClick={handleClickTvSeries}
              >
                <span>TV Series</span>
              </div>
              <div
                className={`btn2 m-btn ${isMoviesActive ? "active" : ""}`}
                onClick={handleClickMovies}
              >
                <span>Movies</span>
              </div>
            </div>
          </div>
          <div className="moive-content">
            {popular.map((element) => {
              return (
                <a
                  href={`https://www.themoviedb.org/movie/${element.id}`}
                  key={element.id}
                >
                  <div className="moive-card">
                    <div className="card-image">
                      <img
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face${element.poster_path}`}
                        alt=""
                      />
                    </div>
                    <div className="movie-title">
                      {isMoviesActive ? element.original_title : element.name}
                    </div>
                    <p className="movie-date">
                      {isMoviesActive
                        ? element.release_date
                        : element.first_air_date}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
