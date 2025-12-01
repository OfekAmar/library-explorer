import React from "react";

interface RatingFilterProps {
    minRating: number;
    onRatingChange: (rating: number) => void;
}

export function RatingFilter({minRating, onRatingChange}: RatingFilterProps) {
    return (
        <div className="control-row">
          <label htmlFor='rating-filter' className="control-label">Filter by minimum rating: </label>
          <input id='rating-filter' type='number' min={0} max={5} step={0.5} value={minRating}
            onChange={(event) => {
              const value = Number(event.target.value);
              onRatingChange(value);
            }}></input>
        </div>
    )
}