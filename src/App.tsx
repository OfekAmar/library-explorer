import React, { useState, useEffect } from 'react';
import './App.css';
import { Book, Tag, SortOption } from "./types";
import { SearchBar } from './components/SearchBar';
import { TagFilter } from './components/TagFilter';
import { RatingFilter } from './components/RatingFilter';
import { SortSelection } from './components/SortSelection';
import { FavoritesToggle } from './components/FavoritesToggle';
import { ResetFilters } from './components/ResetFilters';
import { BooksList } from './components/BooksList';
import logo from "./assets/images/logo.png";

function App() {

  const [books, setBooks] = useState<Book[]>([]); // list of all books loaded from books.json
  const [loading, setLoading] = useState<boolean>(true); // loading and error states for the data fetch
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(""); // search term for filtering by title or author
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null); // currently selected tag filter (or null when no tag is selected)
  const [minRating, setMinRating] = useState(0) // minimum rating filter (0–5)
  const [sortOption, setSortOption] = useState<SortOption>('none'); // current sort option
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false); // whether to show only favorite books
  // list of favorite book IDs, initialized from localStorage
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

  //fetch the books data from /books.json when the component mounts.
  //handles loading and error states.
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
        // always stop the loading state, regardless of success/failure
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //apply search, tag, rating and favorites filters to the books list.
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

  // sorting - making a copy of filteredBooks in order to not change the original array
  // and then sorting based on the selected sort option
  // creating a copy to avoid changing the original array
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

  //toggles a book's favorite status by adding/removing its ID from the favorites list.
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
  // render loading, error UI
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}> Error : {error}  </p>;
  }

  return (
    <div className='app'>
      <header className="app-header">
        {/*The logo was created by me for previous collage project and internal use*/}
        <img src={logo} alt="Bookify logo" className="app-logo" />
      </header>
      <div className="search-section">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <div className='filters-section'>
        <div className='controls'>
          <TagFilter selectedTag={selectedTag} onTagChange={setSelectedTag} />
          <RatingFilter minRating={minRating} onRatingChange={setMinRating} />
          <SortSelection sortOption={sortOption} onSortChange={setSortOption} />
          <FavoritesToggle checked={showFavoritesOnly} onChange={setShowFavoritesOnly} />
          {/* Reset all filters (except favorites state) */}
          <ResetFilters onReset={() => {
            setSearchTerm("");
            setSelectedTag(null);
            setMinRating(0);
            setSortOption("none");
          }} />
        </div>
      </div>
      {/* Render the final list of books after filtering and sorting */}
      <BooksList books={sortedBooks} favoriteIds={favorites} onToggleFavorite={toggleFavorite} />
    </div>

  );
}

export default App;
