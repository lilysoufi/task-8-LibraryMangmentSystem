## 📚 Library Management System API

A comprehensive RESTful API for managing library operations including user management, materials (books, magazines, CDs, maps), loans, reservations, ratings & reviews, and fine calculations.

## 🎯 Features

- **User Management** - Members, Librarians, Managers with role-based access
- **Material Management** - Books and magazines with full CRUD operations
- **Loan System** - Borrow, return, and track materials with fine calculation
- **Reservation System** - Reserve unavailable materials with queue priority
- **Review System** - Rate materials (1-5 stars) and write reviews
- **Authentication** - JWT-based authentication and authorization
- **Fine Calculation** - Automatic fine calculation for overdue items

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/lilysoufi/task-8-LibraryMangmentSystem.git
cd library-management-system

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start MongoDB (if running locally)
mongod

# 5. Run the application
npm start