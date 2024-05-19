import React, { useState, useEffect } from "react";
import MovieDetail from "../browse/MovieDetail";
import "./SearchResult.css";

const base_url = "https://image.tmdb.org/t/p/original";

const SearchResult = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/api/movies/search?token=8qlOkxz4wq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: query }),
      });
      const data = await res.json();
      setMovies(data.result);
    }
    if (query) {
      fetchData();
    } else {
      setMovies([]);
    }
  }, [query]);

  const handleClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
      setTrailerUrl("");
    } else {
      fetch("http://localhost:5000/api/movies/video?token=8qlOkxz4wq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: movie.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectedMovie(movie);          
          if (data.message === "Not found video") {
            let image = (
              <img
                src={`${
                  movie.backdrop_path
                    ? `${base_url}${movie.backdrop_path}`
                    : `${base_url}${movie.poster_path}`
                }`}
                alt=""
                height="400"
                width="100%"
              ></img>
            );
            setTrailerUrl(image);
          } else {
            let video = (
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${data.result.key}`}
              ></iframe>
            );
            setTrailerUrl(video);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>Search Result</h2>
      <div className="row_posters search-resul-container sc2">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              id={movie.id}
              className={`row_poster row_posterLarge`}
              onClick={() => handleClick(movie)}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            />
          );
        })}
        <div style={{ padding: "40px" }}>
          {selectedMovie && (
            <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
