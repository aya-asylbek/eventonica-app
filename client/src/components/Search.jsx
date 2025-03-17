import { useContext } from 'react';
import { EventContext } from '../EventContext';

export default function Search() {
  const { state, dispatch } = useContext(EventContext);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Convert search query to lowercase
    const searchValue = state.searchQuery.toLowerCase();
    
    const filtered = state.allEvents.filter(event => {
      switch (state.searchType) {
        case 'name':
          return event.name.toLowerCase().includes(searchValue);
        case 'category':
          return event.category.toLowerCase().includes(searchValue);
        case 'date':
          // Compare date strings (YYYY-MM-DD format)
          const eventDate = new Date(event.date).toISOString().split('T')[0];
          return eventDate === state.searchQuery;
        default:
          return true;
      }
    });

    dispatch({ type: 'SEARCH_EVENTS', payload: filtered });
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <select
        value={state.searchType}
        onChange={e => dispatch({ type: 'SET_SEARCH_TYPE', payload: e.target.value })}
      >
        <option value="name">Name</option>
        <option value="category">Category</option>
        <option value="date">Date</option>
      </select>

      <input
        type={state.searchType === 'date' ? 'date' : 'text'}
        value={state.searchQuery}
        onChange={e => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
        placeholder={`Search by ${state.searchType}...`}
      />

      <button type="submit">Search</button>
    </form>
  );
}

