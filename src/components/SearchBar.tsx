import React from "react";

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}
export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    return (
        <div>
            <label htmlFor="search"> Search by title or author</label>
            <input id='search' type='text' value={searchTerm} onChange={(event) => 
            onSearchChange(event.target.value)}>
            </input>
        </div>
    )
}