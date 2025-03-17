// src/App.jsx
import { useState, useEffect } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Eventonica</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name} - {event.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;