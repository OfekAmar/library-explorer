export type Tag =
    | 'tech'
    | 'non-fiction'
    | 'fiction'
    | 'fantasy'
    | 'history'
    | 'self-help'
    | 'science';
export interface Book {
    id: string;
    title: string;
    author: string;
    year: number;
    rating: number; // 0–5
    tags: Tag[];
    description: string;
}
// Added type for sorting options
export type SortOption =
    | 'none'
    | 'title-asc'
    | 'title-desc'
    | 'rating-asc'
    | 'rating-desc';