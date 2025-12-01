import React from "react";
import { Tag } from "../types";

interface TagFilterProps {
    selectedTag: Tag | null;
    onTagChange: (tag: Tag | null) => void
}

// TagFilter Component: a dropdown for filtering library items by tag
// selectedTag + onTagChange come from parent component
export function TagFilter({ selectedTag, onTagChange }: TagFilterProps) {

    // Handle change in selection
    // converts the selected string value into a Tag type and sends it back to the parent component
    // if "All" is selected, sends null to indicate no filtering
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
            <select id="tag-filter" value={selectedTag ?? ""} // Null becomes empty string for the select
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