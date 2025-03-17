import { useContext, useState } from 'react'; // Add useState import
import { EventContext } from '../EventContext';

export default function AddEvent() {
  const { dispatch } = useContext(EventContext);
  // Use single state object for form data
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newEvent = await response.json();
      dispatch({ type: 'ADD_EVENT', payload: newEvent });
      setFormData({ name: '', date: '', category: '' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add event' });
    }
  };

  // Update form data state correctly
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Event name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <button type="submit">Add Event</button>
    </form>
  );
}