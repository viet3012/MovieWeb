const Genres = require("../models/Genres");
const Movies = require("../models/Movies");
const Videos = require("../models/Videos");
const paginate = require("../utils/paging");

const pageSize = 20;

// Lấy thông tin phim trending
exports.getTrendingMovie = (req, res) => {
  const page = req.query.page || 1;
  const movies = Movies.all();

  // sắp xếp theo popularity
  const sortedMovies = movies.sort((a, b) => b.popularity - a.popularity);

  const result = paginate(sortedMovies, pageSize, 1);
  const totalPage = Math.ceil(sortedMovies.length / pageSize);
  res.status(200).json({
    result: result,
    page: page,
    total_page: totalPage,
  });
};

// Lấy thông tin phim có rating cao
exports.getRatingMovie = (req, res) => {
  const page = req.query.page || 1;
  const movies = Movies.all();

  // sắp xếp theo vote_average
  const sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average);

  const result = paginate(sortedMovies, pageSize, 1);
  const totalPage = Math.ceil(sortedMovies.length / pageSize);
  res.status(200).json({
    result: result,
    page: page,
    total_page: totalPage,
  });
};

// Lấy thông tin phim theo thể loại
exports.getGenreMovie = (req, res) => {
  const page = req.query.page || 1;
  const genre = req.query.genre;
  const movies = Movies.all();
  const genres = Genres.all();

  // tìm thể loại theo id
  const checkGenre = genres.find((item) => item.id === +genre);

  if (!genre) {
    res.status(400).json({ message: "Not found genre parram" });
  }
  if (!checkGenre) {
    res.status(400).json({ message: "Not found that genre id" });
  }

  // lọc phim có chứa thể loại
  const filterMovies = movies.filter((item) => item.genre_ids.includes(+genre));
  const result = paginate(filterMovies, pageSize, 1);

  const totalPage = Math.ceil(filterMovies.length / pageSize);
  res.status(200).json({
    result: result,
    page: page,
    total_page: totalPage,
    genre_name: checkGenre.name,
  });
};

// Lấy video trailer
exports.postVideoMovie = (req, res) => {
  const filmId = req.body.id;
  const videos = Videos.all();
  const checkVideo = videos.find((item) => item.id === +filmId);

  if (!filmId) {
    return res.status(400).json({ message: "Not found film_id parram" });
  }
  if (!checkVideo) {
    return res.status(404).json({ message: "Not found video" });
  }

  // lọc video đủ điều kiện
  const filterVideo = checkVideo.videos
    .filter((item) => item.official)
    .filter((item) => item.site === "YouTube")
    .filter((item) => item.type === "Trailer" || item.type === "Teaser")
    .sort((a, b) => {
      if (a.type > b.type) {
        return -1;
      }
      if (a.type < b.type) {
        return 1;
      }
      return 0;
    })
    .sort((a, b) => b.published_at - a.published_at);

  if (filterVideo.length === 0) {
    return res.status(404).json({ message: "Not found video" });
  }
  const result = filterVideo[0];
  res.status(200).json({
    result: result,
  });
};

// Tìm kiếm phim theo keyword
exports.postSearchMovie = (req, res) => {
  const page = req.query.page || 1;
  const keyword = req.body.keyword;
  const movies = Movies.all();
  if (!keyword) {
    return res.status(400).json({ message: "Not found keyword parram" });
  }

  // lọc phim theo keyword
  const sortedMovies = movies.filter(
    (item) =>
      item.overview?.toLowerCase().includes(keyword.toLowerCase()) ||
      item.title?.toLowerCase().includes(keyword.toLowerCase())
  );
  const result = paginate(sortedMovies, pageSize, 1);

  const totalPage = Math.ceil(sortedMovies.length / pageSize);
  res.status(200).json({
    result: result,
    page: page,
    total_page: totalPage,
  });
};
