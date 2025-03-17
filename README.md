# Eventonica 🎟️

A full-stack event management application built with React ⚛️, Express 🚂, and PostgreSQL 🐘.



## Features ✨

- 🚀 **CRUD Operations**: Create, Read, Update, Delete events
- 🔍 **Advanced Search**: Filter by name, category, or date
- 📅 **Date Handling**: ISO date formatting and validation
- 🛡️ **Error Handling**: Graceful error messages and loading states
- ✅ **Validation**: Form validation for event creation
- 📱 **Responsive Design**: Mobile-friendly interface

## Tech Stack 🛠️

- **Frontend**:  
  ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
  ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)
  
- **Backend**:  
  ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
  ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white)

- **Testing**:  
  ![Vitest](https://img.shields.io/badge/-Vitest-6E4F7D?logo=vitest&logoColor=white)
  ![Testing Library](https://img.shields.io/badge/-Testing%20Library-E33332?logo=testing-library&logoColor=white)

## Database Setup 🗄️

The `schema.sql` file contains the database structure:

```sql
-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  category VARCHAR(100)
);


To set up the database:

Create database:

createdb eventonica

Apply schema:

psql -d eventonica -f server/db/schema.sql

(Optional) Add sample data:

sql
Copy
INSERT INTO events (name, date, category)
VALUES 
  ('Music Concert', '2025-05-15', 'Music'),
  ('Tech Conference', '2025-06-20', 'Technology');

Getting Started 🚀

Prerequisites 📋

Node.js v18+ 

PostgreSQL v15+

npm v9+


Installation ⬇️

# Clone repository

git clone https://github.com/aya-asylbek/eventonica-app.git

cd eventonica

# Install backend dependencies

cd server && npm install

# Install frontend dependencies

cd ../client && npm install

Running the Application ▶️

Backend Server:

cd server

npm start

Frontend Client:

cd client

npm run dev

Visit http://localhost:5173 in your browser 🌐

Testing 🧪
Run frontend tests:

cd client

npm test

You will see test Results 

Project Structure 📂


eventonica/
├── client/             # Frontend
│   ├── src/           # React components
│   └── __tests__/     # Test files 🧪
│
├── server/            # Backend
│   ├── db/
│   │   └── schema.sql # Database schema 💾
│   └── routes/        # API endpoints 🚪
│
└── README.md          # You are here 📍


API Documentation 📚

Endpoint	Method	Description
/api/events	GET	Get all events
/api/events	POST	Create new event
/api/events/:id	DELETE	Delete event
/api/events/search	GET	Search events 🔍

Contributing 🤝

🍴 Fork the repository

🌿 Create your feature branch (git checkout -b feature/AmazingFeature)

💾 Commit your changes (git commit -m 'Add some AmazingFeature')

4: 🚀 Push to the branch (git push origin feature/AmazingFeature)

🔄 Open a Pull Request

License 📄

Distributed under the MIT License.

 See LICENSE for more information.

Happy Event Planning! 🎉📅✨