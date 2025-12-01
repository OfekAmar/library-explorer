import React from "react";
import type { Book } from "../types";

interface BookItemProps {
    book: Book;
    isFavorite: boolean;
    onToggleFavorite: (bookId: string) => void;
}

export function BookItem({ book, isFavorite, onToggleFavorite }: BookItemProps) {
    return (
        <li>
            <button type="button" onClick={() => onToggleFavorite(book.id)}>
                {isFavorite ? "★" : "☆"}
            </button>{' '}
            <strong>{book.title}</strong> - {book.author} ({book.year})
        </li>
    )
}