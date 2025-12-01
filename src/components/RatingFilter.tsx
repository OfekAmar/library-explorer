import React from "react";

interface RatingFilterProps {
    minRating: number;
    onRatingChange: (rating: number) => void;
}

// RatingFilter Component: a number input to filter the book list by minimum rating
// value and update handler come from parent component
export function RatingFilter({minRating, onRatingChange}: RatingFilterProps) {
    return (
        <div className="control-row">
          <label htmlFor='rating-filter' className="control-label">Filter by minimum rating: </label>
          <input id='rating-filter' type='number' min={0} max={5} step={0.5} value={minRating}
            onChange={(event) => {
              const value = Number(event.target.value);
              onRatingChange(value); // pass new rating back to parent component
            }}></input>
        </div>
    )
}