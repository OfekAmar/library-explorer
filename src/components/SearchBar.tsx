import React from "react";

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

// SearchBar Component: an input field to search books by title or author
// searchTerm + onSearchChange come from parent component
export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    return (
        <div className="search-bar">
            {/* Search input: updates searchTerm in parent component */}
            <input
                type="text"
                className="search-bar-input"
                placeholder="Search by title or author"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search by title or author"
            />

            {/* Search Icon using SVG from w3.org*/}
            <button type="button" className="search-bar-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="search-icon-svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>
        </div>
    )
}