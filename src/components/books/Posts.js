import React, { useContext } from "react";
import PropTypes from "prop-types";
import Card from "../card/Card";
import { CartContext } from "../cart/CartContext";
import { NotificationContext } from "../notification/NotificationContext";
import "./Books.scss";

const Posts = props => {
  const { posts } = props;
  const [, addItemToCart] = useContext(CartContext);
  const [, , , , notify] = useContext(NotificationContext);
  // makes items into cards
  const postsToShow = posts.map(post => (
    <Card
      key={post.id}
      image={post.image}
      title={post.title}
      author={post.author}
      genre={post.genre}
      price={post.price}
      onclick={() => {
        addItemToCart(post);
        notify(` "${post.title}" has been adeed to the cart`);
      }}
    />
  ));

  return (
    <div className="posts-container books-animated fade-in">{postsToShow}</div>
  );
};

export default Posts;

Posts.propTypes = {
  posts: PropTypes.instanceOf(Array).isRequired
};
