import React from "react";
import { SortOption } from "../types";


interface SelectionProps {
    sortOption: SortOption;
    onSortChange: (option: SortOption) => void;
}

// SortSelection Component: a dropdown to select sorting option for the book list
// sortOption + onSortChange come from parent component
export function SortSelection({ sortOption, onSortChange }: SelectionProps) {

    // Handle change in selection
    // converts the selected string value into a SortOption type and sends it back to the parent component
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as SortOption;
        onSortChange(value);
    }

    return (
        <div className="control-row">
            <label htmlFor='sort' className="control-label">Sort by: </label>
            <select id='sort' value={sortOption} onChange={handleChange}>
                <option value='none'>None</option>
                <option value='title-asc'>Title (A-Z)</option>
                <option value='title-desc'>Title (Z-A)</option>
                <option value='rating-asc'>Rating (Low to High)</option>
                <option value='rating-desc'>Rating (High to Low)</option>
            </select>
        </div>
    )
}