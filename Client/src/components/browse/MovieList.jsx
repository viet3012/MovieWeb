import React, { useState, useEffect } from "react";
import MovieDetail from "../../components/browse/MovieDetail";
import "./MovieList.css";

const base_url = "https://image.tmdb.org/t/p/original";

function MovieList({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(fetchUrl);
      const data = await res.json();
      setMovies(data.result);
    }
    fetchData();
  }, [fetchUrl]);

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
      <h2 className="movie-list-title">{title}</h2>
      <div className="row_posters sc2">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div style={{ padding: "40px" }}>
        {selectedMovie && (
          <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />
        )}
      </div>
    </div>
  );
}

export default MovieList;
