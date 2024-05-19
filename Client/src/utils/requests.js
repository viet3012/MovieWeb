const token = "8qlOkxz4wq";
const requests = {
  fetchTrending: `http://localhost:5000/api/movies/trending?token=${token}`,
  fetchTopRated: `http://localhost:5000/api/movies/top-rate?token=${token}`,
  fetchActionMovies: `http://localhost:5000/api/movies/discover?genre=28&token=${token}`,
  fetchComedyMovies: `http://localhost:5000/api/movies/discover?genre=35&token=${token}`,
  fetchHorrorMovies: `http://localhost:5000/api/movies/discover?genre=27&token=${token}`,
  fetchRomanceMovies: `http://localhost:5000/api/movies/discover?genre=10749&token=${token}`,
  fetchDocumentaries: `http://localhost:5000/api/movies/discover?genre=99&token=${token}`,
};

export default requests;
