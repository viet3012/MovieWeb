import { useState } from "react";
import Movie from "./Movie";
import MovieDetail from "./MovieDetail";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [isClick, setIsClick] = useState(false);

  const clickHandler = (movie, isClicked) => {
    setSelectedMovie(movie);
    setIsClick(isClicked);
  };

  return (
    <div className={classes.movie_list}>
      <h3>{props.title}</h3>
      <Movie
        movie_type={props.movie_type}
        path={props.path}
        onClicked={clickHandler}
      />
      {isClick && <MovieDetail movie={selectedMovie} />}
    </div>
  );
};

export default MovieList;
