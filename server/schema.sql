CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(100) NOT NULL
);

INSERT INTO events (name, date, category) VALUES
('Music Concert', '2025-05-10', 'Music'),
('Tech Conference', '2025-06-12', 'Technology'),
('Art Gallery Opening', '2025-07-20', 'Art'),
('Food Festival', '2025-08-15', 'Food'),
('Yoga Retreat', '2025-09-05', 'Wellness');
