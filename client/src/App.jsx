import { useState, useEffect } from 'react';
import AddEvent from './components/AddEvent';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/events/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setEvents(events.filter(event => event.id !== id));
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Eventonica</h1>
      <AddEvent onAdd={(newEvent) => setEvents([...events, newEvent])} />
      
      {}
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