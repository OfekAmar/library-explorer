# Bookify – Mini Library Explorer

A small React + TypeScript application for browsing, searching, filtering, sorting,  
and marking favorite books.

---

## Features

- **Load & Display:** Fetches books from `public/books.json`, with loading & error states.  
- **Search:** Free text search by title or author (case-insensitive).  
- **Filters:** Filter by tag and minimum rating; reset all filters with one button.  
- **Sorting:** Sort by title (A–Z/Z–A) or rating (low–high/high–low).  
- **Favorites:** Toggle favorites with ⭐; persisted in `localStorage`.  
- **UI/UX:** Clean, responsive design with dedicated components for each feature.

---

## Tech Stack
- React (CRA)  
- TypeScript  
- Plain CSS  
- localStorage persistence  

---

## Key Design Decisions
- Split into small, focused components (SearchBar, Filters, BookItem, etc.).
- Strong typing using `Book`, `Tag`, and `SortOption` interfaces.
- Favorites stored via `localStorage` with lazy initialization.
- No external UI libraries (per assignment requirements).

---

## Running the App

```bash
npm install
npm start
Open: http://localhost:3000
```
---

## Author
Developed by Ofek
React + TypeScript enthusiast
---