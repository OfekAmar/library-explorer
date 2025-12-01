import React from "react";
import { Tag } from "../types";

interface TagFilterProps {
    selectedTag: Tag | null;
    onTagChange: (tag: Tag | null) => void
}

export function TagFilter({ selectedTag, onTagChange }: TagFilterProps) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value === "") {
            onTagChange(null);
        } else {
            onTagChange(value as Tag);
        }
    };

    return (
        <div className="control-row">
            <label htmlFor="tag-filter" className="control-label">Filter by tag: </label>
            <select id="tag-filter" value={selectedTag ?? ""}
                onChange={handleChange}
            >
                <option value="">All</option>
                <option value="tech">Tech</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="fiction">Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="history">History</option>
                <option value="self-help">Self-Help</option>
                <option value="science">Science</option>
            </select>
        </div>
    );
}