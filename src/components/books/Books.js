import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import bookImage from "../../assets/readingBook.svg";
import allBooksData from "../../assets/tmpDataBooks.json";
import Pagination from "./Pagination";
import Posts from "./Posts";
import "./Books.scss";

// component that holds all the filters results derived from filtering
const Books = () => {
  // params are use to determine genre or author of a book
  const params = useParams();

  // initial filter values
  const [selectedGenre, setSelectedGenre] = useState(
    params.genre ? params.genre : "all"
  );
  const [authorValue, setAuthorValue] = useState(
    params.author ? params.author : ""
  );

  const [searchValue, setSearchValue] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [minPrice, setMinPrice] = useState(1);
  const [priceError, setPriceError] = useState(false);

  // pagination
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // page change function
  const paginate = pageNumber => setCurrentPage(pageNumber);
  // books to show after all the books have been filtered, initially all
  const [filteredBooks, setFilteredBooks] = useState(allBooksData);
  const [errorText, setErrorText] = useState("");
  // if genre/author params change, filter changes
  useEffect(() => {
    if (params.genre) setSelectedGenre(params.genre);
  }, [params.genre]);
  useEffect(() => {
    if (params.author) setSelectedGenre("all");
  }, [params.author]);

  // set posts
  useEffect(() => {
    setPosts(filteredBooks);
  }, [filteredBooks]);
  // set page to 1 when a filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);

  // show error if user enters non number value in price values
  const numberRegex = /^\d*$/;
  useEffect(() => {
    if (numberRegex.test(minPrice) && numberRegex.test(maxPrice))
      setPriceError(false);
    else {
      setPriceError(true);
    }
  }, [minPrice, maxPrice, numberRegex]);

  useEffect(() => {
    if (priceError) setErrorText("Price must be a number");
    else setErrorText("No book matches your filters");
  }, [priceError]);

  // applying filters
  useEffect(() => {
    let byPriceGenre;
    if (selectedGenre === "all")
      byPriceGenre = allBooksData.filter(
        book => book.price < maxPrice && book.price > minPrice
      );
    else
      byPriceGenre = allBooksData.filter(
        book =>
          book.genre === selectedGenre &&
          book.price < maxPrice &&
          book.price > minPrice
      );
    const byTitle = byPriceGenre.filter(book => {
      if (book.title.toLowerCase().match(searchValue.toLowerCase()) !== null)
        return true;
      return false;
    });
    const byAuthor = byTitle.filter(book => {
      if (book.author.toLowerCase().match(authorValue.toLowerCase()) !== null)
        return true;
      return false;
    });
    const afterAllFilters = byAuthor;
    setFilteredBooks(afterAllFilters);
  }, [selectedGenre, authorValue, maxPrice, minPrice, searchValue]);

  // scrolls to top of page for better UX
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="books">
      <img src={bookImage} alt="book" className="corner-image" />
      <div className="filters ">
        <div className="filter">
          <div className="filter-title">Select genre:</div>
          <select
            value={selectedGenre}
            name="genres"
            className="filter-input"
            onChange={e => setSelectedGenre(e.target.value)}
          >
            <option value="all">All</option>
            <option value="action">Action&amp;Adventure</option>
            <option value="crime">Crime</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="filter">
          <div className="filter-title">
            Pick price range :{/* {minPrice} - {maxPrice} */}
          </div>
          <div className="price-filter">
            <input
              className="filter-input-small"
              maxLength="4"
              type="text"
              placeholder="0"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
            <div className="price-range-text">to</div>
            <input
              className="filter-input-small"
              maxLength="4"
              type="text"
              placeholder="100"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="filter">
          <div className="filter-title">Search by title:</div>
          <input
            className="filter-input"
            type="text"
            placeholder=" Title..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        <div className="filter">
          <div className="filter-title">Search by author:</div>
          <input
            className="filter-input"
            type="text"
            placeholder=" Author..."
            value={authorValue}
            onChange={e => setAuthorValue(e.target.value)}
          />
        </div>
      </div>
      {filteredBooks.length > 0 ? (
        <div>
          <Posts posts={currentPosts} className="posts-container " />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            selectedPage={currentPage}
          />
        </div>
      ) : (
        <div className="no-match">{errorText}</div>
      )}
    </div>
  );
};

export default Books;
