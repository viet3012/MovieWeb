import { useState } from "react";
import ResultList from "./ResultList";
import classes from "./SearchForm.module.css";

const SearchForm = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  // Lấy thông tin input
  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  // Hàm sự kiện nút search
  const submitHandler = (event) => {
    event.preventDefault();
    setResult(<ResultList query={input} />);
  };

  // Hàm sự kiện nút reset
  const resetHandler = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className={classes.container}>
      <form
        className={classes.form}
        onSubmit={submitHandler}
        onReset={resetHandler}
      >
        <div className={classes.input_container}>
          <input
            type="text"
            value={input}
            className={classes.input}
            onChange={inputChangeHandler}
          ></input>
          <div className={classes.icon}>
            <svg
              className="svg-inline--fa fa-search fa-w-16"
              fill="#ccc"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </div>
        </div>
        <div className={classes.btn_container}>
          <button
            className={`${classes.btn} ${classes.btn_reset}`}
            type="reset"
          >
            Reset
          </button>
          <button
            className={`${classes.btn} ${classes.btn_search}`}
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      {result}
    </div>
  );
};

export default SearchForm;
