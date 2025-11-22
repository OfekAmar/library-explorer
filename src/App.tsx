import React, { use } from 'react';
import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { Book , Tag} from "./types";

function App() {

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

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
    return titleRes || authorRes;
  })

  return (
    <div>
      <h1>  Library Explorer </h1>
      <div>
        <label htmlFor='search'> Search by title or author: </label>
        <input id='search' type='text' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
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
