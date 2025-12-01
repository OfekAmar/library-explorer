import React from "react";
import type { Book } from "../types";

interface BookItemProps {
    book: Book;
    isFavorite: boolean;
    onToggleFavorite: (bookId: string) => void;
}

export function BookItem({ book, isFavorite, onToggleFavorite }: BookItemProps) {
    return (
        <li className="book-card">
            <div className="book-card-header">
                <button type="button" onClick={() => onToggleFavorite(book.id)}>
                    {isFavorite ? "★" : "☆"}
                </button>{' '}
                <div className="book-title-author">
                    <h2 className="book-title">{book.title}</h2>
                    <p className="book-author">{book.author}</p>
                </div>
            </div>
            <div className="book-meta">
                <span>Year: {book.year}</span>
                <span>Rating: {book.rating}</span>
            </div>
            <div className="book-tags">
                {book.tags.map((tag) => (
                    <span key={tag} className="book-tag">
                        {tag}
                    </span>
                ))}
            </div>
            <p className="book-description">{book.description}</p>
        </li>
    )
}