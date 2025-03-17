import { useState } from 'react';

export default function Search({ onSearch }) {
    const [query, setQuery] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`http://localhost:5000/api/events/search?name=${query}`)
        .then(res => res.json())
        .then(data => onSearch(data))
        .catch(err => console.error(err));
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events..."
        />
        <button type="submit">Search</button>
      </form>
    );
  }