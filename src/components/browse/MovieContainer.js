import MovieList from "./MovieList";

const MovieContainer = () => {
  const API_KEY = "9b7c6869419751181392ad8e7c4fd865";
  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  };
  return (
    <div>
      <MovieList
        title=""
        movie_type="poster"
        path={requests.fetchNetflixOriginals}
      />
      <MovieList title="Xu hướng" path={requests.fetchTrending} />
      <MovieList title="Xếp hạng cao" path={requests.fetchTopRated} />
      <MovieList title="Hành động" path={requests.fetchActionMovies} />
      <MovieList title="Hài" path={requests.fetchComedyMovies} />
      <MovieList title="Kinh dị" path={requests.fetchHorrorMovies} />
      <MovieList title="Lãng mạn" path={requests.fetchRomanceMovies} />
      <MovieList title="Tài liệu" path={requests.fetchDocumentaries} />
    </div>
  );
};

export default MovieContainer;
