import React, { use } from 'react';
import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { Book, Tag } from "./types";

function App() {

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [minRating, setMinRating] = useState(0)

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

    return searchRes && matchesTag && matchesRating;
  })

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
      </div>
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
