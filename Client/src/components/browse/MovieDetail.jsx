import React from "react";
import "./MovieDetail.css";

const MovieDetail = ({ movieTrailer, movieData }) => {
  const { release_date, title, name, overview, vote_average } = movieData;

  return (
    <div className="movie_detail">
      <div className="movie_detail_data">
        <h1>{title || name}</h1>
        <hr></hr>

        <h3>Release Date: {release_date}</h3>
        <h3>Vote: {vote_average} / 10</h3>
        <br></br>
        <p>{overview}</p>
      </div>
      <div className="movie_detail_trailer">{movieTrailer}</div>
    </div>
  );
};

export default MovieDetail;
