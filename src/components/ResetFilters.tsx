import React from "react";

interface ResetFiltersProps {
    onReset: () => void
}

export function ResetFilters({ onReset }: ResetFiltersProps) {
    return (
        <div className="control-row control-row--full control-row--right">
            <button type="button" onClick={onReset} className="btn btn-secondary"> Clear </button>
        </div>
    )
}