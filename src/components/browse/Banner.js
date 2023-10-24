import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./Banner.module.css";

const Banner = () => {
  const API_KEY = "9b7c6869419751181392ad8e7c4fd865";
  const [movie, setMovie] = useState([]);

  // Lấy dữ liệu API
  const { error, sendRequest } = useHttp();
  useEffect(() => {
    const getRandomMovie = (data) => {
      const movieBanner =
        data.results[Math.floor(Math.random() * data.results.length - 1)];
      setMovie(movieBanner);
    };
    sendRequest(
      { url: `/discover/tv?api_key=${API_KEY}&with_network=123` },
      getRandomMovie
    );
  }, []);

  return (
    <div className={classes.banner}>
      <img
        src={`${`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}`}
        alt=""
        className={classes.img}
      ></img>
      <div className={classes.description}>
        <h1 className={classes.title}>{movie.name}</h1>
        <button className={classes.btn}>Play</button>
        <button className={classes.btn}>My List</button>
        <p className={classes.overview}>{movie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
