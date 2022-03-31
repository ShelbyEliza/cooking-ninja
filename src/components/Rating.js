const ratingList = [1, 2, 3, 4, 5];

export default function Rating({ handleRating }) {
  return (
    <fieldset>
      <legend>Rating</legend>
      <div className="rating-container">
        {ratingList.map((rating) => (
          <div className="rating-option" key={rating}>
            <input
              name="rating"
              type="radio"
              id={rating}
              value={rating}
              onClick={(e) => handleRating(e)}
            />
            <label className="rating-label" htmlFor={rating}>
              {rating}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
