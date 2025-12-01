import React from 'react';
import { useState, useEffect } from "react";
import './App.css';
import { Book, Tag, SortOption } from "./types";
import { SearchBar } from './components/SearchBar';
import { TagFilter } from './components/TagFilter';
import { RatingFilter } from './components/RatingFilter';
import { SortSelection } from './components/SortSelection';
import { FavoritesToggle } from './components/FavoritesToggle';
import { ResetFilters } from './components/ResetFilters';

function App() {

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [minRating, setMinRating] = useState(0)
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favorites");
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed as string[];
      }
      return [];
    } catch {
      return [];
    }
  });



  useEffect(() => {
    setLoading(true);
    fetch("/books.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load books.json");
        }
        return res.json()
      })
      .then((data) => {
        setBooks(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}> Error : {error}  </p>;
  }

  const filteredBooks = books.filter((book) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const titleRes = book.title.toLowerCase().includes(lowercaseSearchTerm);
    const authorRes = book.author.toLowerCase().includes(lowercaseSearchTerm);
    const searchRes = titleRes || authorRes
    const matchesTag = selectedTag === null || book.tags.includes(selectedTag);
    const matchesRating = book.rating >= minRating;
    const matchesFavorites = !showFavoritesOnly || favorites.includes(book.id);

    return searchRes && matchesTag && matchesRating && matchesFavorites;
  })

  // Sorting - making a copy of filteredBooks in order to not change the original array
  // and then sorting based on the selected sort option
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'rating-asc':
        return a.rating - b.rating;
      case 'rating-desc':
        return b.rating - a.rating;
      case 'none':
      default:
        return 0;
    }

  });

  const toggleFavorite = (bookId: string) => {
    setFavorites((prev) => {
      if (prev.includes(bookId)) {
        return prev.filter((id) => id !== bookId)
      } else {
        return [...prev, bookId

        ]
      }
    })
  }

  return (
    <div>
      <h1>  Library Explorer </h1>
      <div>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <TagFilter selectedTag={selectedTag} onTagChange={setSelectedTag} />
        <RatingFilter minRating={minRating} onRatingChange={setMinRating} />
        <SortSelection sortOption={sortOption} onSortChange={setSortOption} />
        <FavoritesToggle checked={showFavoritesOnly} onChange={setShowFavoritesOnly} />
        <ResetFilters onReset={() => {
          setSearchTerm("");
          setSelectedTag(null);
          setMinRating(0);
          setSortOption("none");
        }} />
      </div>
      <ul>
        {sortedBooks.map((book) => (
          <li key={book.id}>
            <button type="button" onClick={() => toggleFavorite(book.id)}>
              {favorites.includes(book.id) ? "★" : "☆"}
            </button>{' '}
            <strong>{book.title}</strong> - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
