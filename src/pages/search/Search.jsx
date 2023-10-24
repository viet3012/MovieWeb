import React from "react";
import Navbar from "../../components/browse/Navbar";
import SearchForm from "../../components/search/SearchForm";
import { Fragment } from "react";

const Search = () => {
  return (
    <Fragment>
      <Navbar />
      <SearchForm />
    </Fragment>
  );
};

export default Search;
