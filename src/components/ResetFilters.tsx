import React from "react";

interface ResetFiltersProps {
    onReset: () => void
}

export function ResetFilters({ onReset }: ResetFiltersProps) {
    return (
        <div style={{ marginTop: '10px' }}>
            <button onClick={onReset}> Clear </button>
        </div>
    )
}