import { useState, useEffect } from 'react';
import AddEvent from './components/AddEvent';
import Search from './components/Search';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]); // To preserve original list

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setAllEvents(data); // Store original list
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/events/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setEvents(events.filter(event => event.id !== id));
        setAllEvents(allEvents.filter(event => event.id !== id)); // Update both states
      })
      .catch(err => console.error(err));
  };

  // Handle search results
  const handleSearch = (results) => {
    setEvents(results);
  };

  // Reset to show all events
  const handleShowAll = () => {
    setEvents(allEvents);
  };

  return (
    <div>
      <h1>Eventonica</h1>
      
      {/* Search Component */}
      <Search onSearch={handleSearch} />
      <button onClick={handleShowAll} className="show-all-button">
        Show All Events
      </button>

      <AddEvent onAdd={(newEvent) => {
        setEvents([...events, newEvent]);
        setAllEvents([...allEvents, newEvent]); // Keep allEvents updated
      }} />

      <table className="event-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.category}</td>
              <td>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;