import { useContext, useEffect } from 'react';
import { EventContext } from './EventContext';
import AddEvent from './components/AddEvent';
import Search from './components/Search';
import './App.css';

function App() {
  const { state, dispatch } = useContext(EventContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        dispatch({ type: 'FETCH_EVENTS', payload: data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };
    fetchEvents();
  }, [dispatch]);

  const handleSearch = (results) => {
    dispatch({ type: 'SEARCH_EVENTS', payload: results });
  };

  const handleShowAll = () => {
    dispatch({ type: 'RESET_EVENTS' });
  };

  if (state.loading) return <div className="loading">Loading...</div>;
  if (state.error) return <div className="error">Error: {state.error}</div>;

  return (
    <div>
      <h1>Eventonica</h1>
      <Search onSearch={handleSearch} />
      <button onClick={handleShowAll} className="show-all-button">
        Show All Events
      </button>
      <AddEvent />
      
      <table className="event-table">
        {}
        <tbody>
          {state.events.map(event => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.category}</td>
              <td>
                <button
                  onClick={() => dispatch({ 
                    type: 'DELETE_EVENT', 
                    payload: event.id 
                  })}
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