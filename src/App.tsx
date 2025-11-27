import React, { use } from 'react';
import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { Book, Tag } from "./types";

function App() {

  type SortOption = 'none' | 'title-asc' | 'title-desc' | 'rating-asc' | 'rating-desc';

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
    console.log("כתיבה ל-localStorage:", favorites);
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
        <label htmlFor='search'> Search by title or author: </label>
        <input id='search' type='text' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="tag-filter">Filter by tag: </label>
          <select id="tag-filter" value={selectedTag ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              setSelectedTag(value === "" ? null : (value as Tag));
            }}
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
        <div style={{ marginTop: '10px' }}>
          <label htmlFor='rating-filter'>Filter by minimum rating: </label>
          <input id='rating-filter' type='number' min={0} max={5} step={0.5} value={minRating}
            onChange={(event) => {
              const value = Number(event.target.value);
              setMinRating(value);
            }}></input>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor='sort'>Sort by: </label>
          <select id='sort' value={sortOption} onChange={(event) => {
            setSortOption(event.target.value as SortOption)
          }}
          >
            <option value='none'>None</option>
            <option value='title-asc'>Title (A-Z)</option>
            <option value='title-desc'>Title (Z-A)</option>
            <option value='rating-asc'>Rating (Low to High)</option>
            <option value='rating-desc'>Rating (High to Low)</option>
          </select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>
            <input type="checkbox" id="favoritesOnly" checked={showFavoritesOnly} onChange={(event) => {
              setShowFavoritesOnly(event.target.checked);
            }} />
            {" "}
            show Favorites only
          </label>
        </div>
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => {
            setSearchTerm("");
            setSelectedTag(null);
            setMinRating(0);
            setSortOption('none');
          }}> Clear </button>
        </div>
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
