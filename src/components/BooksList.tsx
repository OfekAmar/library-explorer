import React from "react";
import type { Book } from "../types";
import { BookItem } from "./BookItem";

interface BooksListProps {
    books: Book[];
    favoriteIds: string[];
    onToggleFavorite: (bookId: string) => void;

}

//BooksList Component: render a list of books using the BookItem component, pass favorite state and toggle function to each BookItem

export function BooksList({ books, favoriteIds, onToggleFavorite }: BooksListProps) {

    // when filters/search return no results, show an empty message
    if (books.length === 0) {
        return <p>No Books found. </p>
    }

    return (
        <ul className="books-list">
            {books.map((book) => (
                <BookItem key={book.id}
                    book={book}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={onToggleFavorite} />
            ))}
        </ul>
    );
}
