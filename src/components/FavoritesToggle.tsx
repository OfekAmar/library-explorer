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
        <div style={{ marginTop: '10px' }}>
            <label>
                <input type="checkbox" id="favoritesOnly" checked={checked} onChange={handleChange} />
                {" "}
                show Favorites only
            </label>
        </div>
    )
}