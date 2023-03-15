import "../pages/create-update/TagsRating.css";
import { useState } from "react";
const ratingList = [1, 2, 3, 4, 5];

export default function Rating({ handleRating, defaultRating }) {
  const [selectedRating, setSelectedRating] = useState(
    defaultRating ? defaultRating : null
  );

  const selectRating = (rating) => {
    setSelectedRating(rating);
    handleRating(rating);
  };

  return (
    <div className="rating-container">
      <fieldset className="rating-fieldset">
        <legend>Rating</legend>
        {ratingList.map((rating) => {
          return (
            <div className="rating-holder" key={rating}>
              <input
                className="rating"
                name="rating"
                type="radio"
                id={rating}
                value={rating}
                onChange={(e) => selectRating(rating)}
                checked={rating === selectedRating ? true : false}
                required
              />
              <label
                className={
                  rating === selectedRating
                    ? `selected rating-option`
                    : `rating-option not-selected`
                }
                htmlFor={rating}
              >
                {rating}
              </label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
