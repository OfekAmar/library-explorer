import React from "react";

interface ResetFiltersProps {
    onReset: () => void
}

// ResetFilters Component: a button to reset all filters applied to the book list
export function ResetFilters({ onReset }: ResetFiltersProps) {
    return (
        <div className="control-row control-row--full control-row--right">
            {/* Button that triggers the parent reset function */}
            <button type="button" onClick={onReset} className="btn btn-secondary"> Clear </button>
        </div>
    )
}