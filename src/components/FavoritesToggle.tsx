import React from "react";

interface FavoritesToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

// FavoritesToggle Component: a checkbox to filter the book list to show only favorites
export function FavoritesToggle({ checked, onChange }: FavoritesToggleProps) {

    // handle checkbox changes and pass the updated value back to the parent component.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    }
    return (
        <div className="control-row">
            <label className="checkbox-label">
                <input type="checkbox" id="favoritesOnly" checked={checked} onChange={handleChange} />
                {" "}
                <span>Show favorites only</span>
            </label>
        </div>
    )
}