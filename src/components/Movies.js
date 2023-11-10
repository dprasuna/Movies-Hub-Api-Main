import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Movies(props) {
  const [movies, setMovies] = useState([]);

  const updateMovies = async () => {
    props.setProgress(10);
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${props.TMBDApiKey}`;
    props.setProgress(40);
    let data = await fetch(url);
    props.setProgress(70);
    let parseData = await data.json();
    setMovies(parseData.results);
    props.setProgress(100);
  };

  // const fetchMoreData = async() => {
  //   const url =`https://api.themoviedb.org/3/movie/top_rated?api_key=${props.TMBDApiKey}`;
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   setMovies(parseData.results);

  // };
  useEffect(() => {
    updateMovies();
  }, []);

  return (
    <>
      <main id="main-body">
        <div className="common-heading">
          <h1>Top Rated Movies</h1>
        </div>
        <div className="movies-page">
          {movies.map((element) => {
            return (
              <a
                href={`https://www.themoviedb.org/movie/${element.id}`}
                key={element.id}
              >
                <div className="common-card">
                  <div className="card-image">
                    <img
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${element.poster_path}`}
                      alt=""
                    />
                  </div>
                  <div className="movie-title">{element.original_title}</div>
                  <p className="movie-date">{element.release_date}</p>
                  <p className="movie-date">
                    {element.overview.slice(0, 200)}...
                  </p>
                </div>
                <div className="common-data"></div>
              </a>
            );
          })}
        </div>
        {/* <InfiniteScroll
          dataLength={movies.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
    </p>
  }/> */}
      </main>
    </>
  );
}
