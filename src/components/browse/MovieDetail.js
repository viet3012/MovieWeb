import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./MovieDetail.module.css";

const MovieDetail = (props) => {
  const API_KEY = "9b7c6869419751181392ad8e7c4fd865";
  let image = (
    <img
      src={`${
        props.movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`
          : `https://image.tmdb.org/t/p/original${props.movie.poster_path}`
      }`}
      alt=""
    ></img>
  );
  const [data, setData] = useState([]);
  const [trailer, setTrailer] = useState(image);
  const request = `/movie/${props.movie.id}/videos?api_key=${API_KEY}`;

  // Lấy dữ liệu API
  const { error, sendRequest } = useHttp();
  useEffect(() => {
    const getMovie = (movie) => {
      setData(movie.results);
    };
    sendRequest({ url: request }, getMovie);
  }, [request]);

  // Kiểm tra video có trailer không
  useEffect(() => {
    let video;
    if (data.length !== 0) {
      for (const e of data) {
        if (
          e.site === "YouTube" &&
          (e.type === "Teaser" || e.type === "Trailer")
        )
          video = (
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${e.key}`}
            ></iframe>
          );
      }
    }
    if (!error && video) setTrailer(video);
    else setTrailer(image);
  }, [error, data]);

  return (
    <div className={classes.detail}>
      <div className={classes.info}>
        <h2 className={classes.title}>
          {props.movie.title || props.movie.name}
        </h2>
        <h4>{`Release Date: ${props.movie.release_date}`}</h4>
        <h4>{`Vote: ${props.movie.vote_average} / 10`}</h4>
        <p>{props.movie.overview}</p>
      </div>
      <div className={classes.trailer}>{trailer}</div>
    </div>
  );
};
export default MovieDetail;
