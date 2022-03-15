import React from "react";

const Rating = ({ value, text }) => {
  const rating_stars1 =
    value >= 1
      ? "fas fa-star"
      : value >= 0.5
      ? "fas fa-star-half-alt"
      : "far fa-star";

  const rating_stars2 =
    value >= 2
      ? "fas fa-star"
      : value >= 1.5
      ? "fas fa-star-half-alt"
      : "far fa-star";
  const rating_stars3 =
    value >= 3
      ? "fas fa-star"
      : value >= 2.5
      ? "fas fa-star-half-alt"
      : "far fa-star";
  const rating_stars4 =
    value >= 1
      ? "fas fa-star"
      : value >= 3.5
      ? "fas fa-star-half-alt"
      : "far fa-star";
  const rating_stars5 =
    value >= 5
      ? "fas fa-star"
      : value >= 4.5
      ? "fas fa-star-half-alt"
      : "far fa-star";
  return (
    <div>
      <span>
        <i className={rating_stars1} />
        <i className={rating_stars2} />
        <i className={rating_stars3} />
        <i className={rating_stars4} />
        <i className={rating_stars5} />
        <text>{`${text}`}</text>
      </span>
    </div>
  );
};

export default Rating;
