import React from "react";
import "./Books.scss";
import PropTypes from "prop-types";

const Pagination = props => {
  const { postsPerPage, totalPosts, paginate, selectedPage } = props;

  const pageNumbers = [];
  // counts number of pages and puts them it an array
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }
  // makes button with page numbers and sets selected one to have different color
  const pageNumberToShow = pageNumbers.map(number => {
    let classPagi = "";
    if (number === selectedPage) classPagi = "pagi-button-selected";
    else classPagi = "pagi-button";
    return (
      <button
        type="button"
        className={classPagi}
        key={number}
        onClick={() => paginate(number)}
      >
        {number}
      </button>
    );
  });

  return <div className="paginate">{pageNumberToShow}</div>;
};

export default Pagination;

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};
