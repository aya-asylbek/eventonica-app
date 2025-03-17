import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App'; 
import { EventProvider } from '../EventContext';

describe('App Component', () => {
  it('renders loading state', () => {
    render(
      <EventProvider>
        <App />
      </EventProvider>
    );
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});