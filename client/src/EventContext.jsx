import { createContext, useReducer } from 'react';

export const EventContext = createContext();

const initialState = {
  events: [],
  allEvents: [],       // Maintain original unfiltered list
  loading: true,
  error: null,
  searchType: 'name',  // 'name', 'category', or 'date'
  searchQuery: ''
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_EVENTS':
      return {
        ...state,
        events: action.payload,
        allEvents: action.payload,  // Store original data separately
        loading: false
      };
      
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
        allEvents: [...state.allEvents, action.payload]
      };

    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(e => e.id !== action.payload),
        allEvents: state.allEvents.filter(e => e.id !== action.payload)
      };

    case 'SEARCH_EVENTS':
      // Actual search logic moved here from component
      const filtered = state.allEvents.filter(event => {
        const query = state.searchQuery.toLowerCase();
        switch (state.searchType) {
          case 'name':
            return event.name.toLowerCase().includes(query);
          case 'category':
            return event.category.toLowerCase().includes(query);
          case 'date':
            return new Date(event.date).toISOString().split('T')[0] === query;
          default:
            return true;
        }
      });
      return { ...state, events: filtered };

    case 'SET_SEARCH_TYPE':
      return { ...state, searchType: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'RESET_EVENTS':
      return { ...state, events: state.allEvents };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

// import { createContext, useReducer } from 'react';

// export const EventContext = createContext();

// const initialState = {
//   events: [],
//   allEvents: [],
//   loading: true,
//   error: null,
//   searchType: 'name',
//   searchQuery: ''
// };

// const eventReducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_EVENTS':
//       return {
//         ...state,
//         events: action.payload,
//         allEvents: action.payload,
//         loading: false
//       };
//     case 'ADD_EVENT':
//       return {
//         ...state,
//         events: [...state.events, action.payload],
//         allEvents: [...state.allEvents, action.payload]
//       };
//     case 'DELETE_EVENT':
//       return {
//         ...state,
//         events: state.events.filter(e => e.id !== action.payload),
//         allEvents: state.allEvents.filter(e => e.id !== action.payload)
//       };
//     case 'SEARCH_EVENTS':
//       return { ...state, events: action.payload };
//     case 'RESET_EVENTS':
//       return { ...state, events: state.allEvents };
//     case 'SET_ERROR':
//       return { ...state, error: action.payload, loading: false };
//     default:
//       return state;
//   }
// };

// export const EventProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(eventReducer, initialState);

//   return (
//     <EventContext.Provider value={{ state, dispatch }}>
//       {children}
//     </EventContext.Provider>
//   );
// };