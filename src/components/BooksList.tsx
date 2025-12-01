import React from "react";
import type { Book } from "../types";
import { BookItem } from "./BookItem";

interface BooksListProps {
    books: Book[];
    favoriteIds: string[];
    onToggleFavorite: (bookId: string) => void;

}

export function BooksList({ books, favoriteIds, onToggleFavorite }: BooksListProps) {

    if (books.length === 0) {
        return <p>No Books found. </p>
    }

    return (
        <ul>
            {books.map((book) => (
                <BookItem key={book.id}
                    book={book}
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggleFavorite={onToggleFavorite} />
            ))}
        </ul>
    );
}
