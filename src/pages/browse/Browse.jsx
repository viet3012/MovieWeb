import React, { Fragment } from "react";
import Banner from "../../components/browse/Banner";
import Navbar from "../../components/browse/Navbar";
import MovieContainer from "../../components/browse/MovieContainer";

function Browse() {
  return (
    <Fragment>
      <Navbar />
      <Banner />
      <MovieContainer />
    </Fragment>
  );
}

export default Browse;
