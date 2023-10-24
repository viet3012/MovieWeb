import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import MovieDetail from "../browse/MovieDetail";
import classes from "./ResultList.module.css";

const ResultList = (props) => {
  const API_KEY = "9b7c6869419751181392ad8e7c4fd865";
  const requestUrl = `/search/movie?api_key=${API_KEY}&language=en-US&query=${props.query}`;
  const [data, setData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [isClick, setIsClick] = useState(false);

  // Lấy dữ liệu
  const { error, sendRequest } = useHttp();
  useEffect(() => {
    setIsClick(false);
    const getMovie = (data) => {
      setData(data.results);
    };
    sendRequest({ url: requestUrl }, getMovie);
  }, [requestUrl]);

  // Hàm sự kiện khi click vào phim
  const clickMovieHandler = (event) => {
    const index = data.findIndex((e) => e.id === +event.target.id);
    if (+event.target.id === selectedMovie.id && isClick) {
      setIsClick(false);
    } else {
      setSelectedMovie(data[index]);
      setIsClick(true);
    }
  };

  return (
    <div className={classes.result}>
      <h2 className={classes.result_title}>Search Result</h2>
      <div className={classes.movie}>
        {data.map((movie) => (
          <img
            key={movie.id}
            id={movie.id}
            onClick={clickMovieHandler}
            src={`${
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            }`}
            alt=""
          ></img>
        ))}
      </div>
      {isClick && <MovieDetail movie={selectedMovie} />}
    </div>
  );
};

export default ResultList;
