import React from "react";

interface FavoritesToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function FavoritesToggle({ checked, onChange }: FavoritesToggleProps) {

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