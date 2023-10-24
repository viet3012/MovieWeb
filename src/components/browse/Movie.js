import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./Movie.module.css";

const Movie = (props) => {
  const [data, setData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [isClick, setIsClick] = useState(false);

  // Lấy dữ liệu API
  const { error, sendRequest } = useHttp();
  useEffect(() => {
    const getMovie = (data) => {
      setData(data.results);
    };
    sendRequest({ url: props.path }, getMovie);
  }, []);

  // Hàm sự kiện khi click vào phim
  const clickMovieHandler = (event) => {
    const index = data.findIndex((e) => e.id === +event.target.id);
    if (+event.target.id === selectedMovie.id && isClick) {
      props.onClicked("", false);
      setIsClick(false);
    } else {
      props.onClicked(data[index], true);
      setSelectedMovie(data[index]);
      setIsClick(true);
    }
  };

  return (
    <div className={classes.movie}>
      {data.map((movie) => (
        <img
          onClick={clickMovieHandler}
          key={movie.id}
          id={movie.id}
          src={`${
            props.movie_type === "poster"
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          }`}
          alt=""
          className={
            props.movie_type === "poster" ? classes.poster : classes.backdrop
          }
        ></img>
      ))}
    </div>
  );
};

export default Movie;
