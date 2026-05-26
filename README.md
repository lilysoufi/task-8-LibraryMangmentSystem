## 📚 Library Management System API

A comprehensive RESTful API for managing library operations including user management, materials (books, magazines, CDs, maps), loans, reservations, ratings & reviews, and fine calculations.

## 🎯 Features

- **User Management** - Members, Librarians, Managers with role-based access
- **Material Management** - Books and magazines with full CRUD operations
- **Loan System** - Borrow, return, and track materials with fine calculation
- **Reservation System** - Reserve unavailable materials with queue priority
- **Review System** - Rate materials (1-5 stars) and write reviews
- **Fine Calculation** - Automatic fine calculation for overdue items

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm 

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/lilysoufi/task-8-LibraryMangmentSystem.git


# 2. Install dependencies
npm install

# 3. Set up environment variables
 .env.example .env

# 4. Start MongoDB (if running locally)
mongodb

# 5. Run the application
npm run watch
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:
**Server configuration**
PORT=3000

**Database configuration**
MONGODB_URI=mongodb://localhost:27017/libraryManagementSystem

## 📮 Example requests (Postman/Thunder Client)

 

 1. Create new member : `POST  http://localhost:3000/api/v1/member`
example of data : 
```
{

"name":  "Lily Luo",

"email":  "Lily.Luo@example.com",

"phone":  "+1234567890",

"registeredAt":  "2024-01-15T09:00:00.000Z",

"password":  "$2b$10$hashedpasswordhere",

"address":  "221B Backer Street",

"dateOfBirth":  "1996-05-15T00:00:00.000Z",

"membershipNumber":  "MEM202400015"

}
```

2.Get all loans : GET http://localhost:3000/api/v1/loans/
3.Cancel a reservation : PATCH http://localhost:3000/api/v1/reservations/cancel/6a15e6b3b14659938642f257
5.Update a review : PUT http://localhost:3000/api/v1/reviews/6a144f763093b7a3c320440b
6.Get book by Id : GET http://localhost:3000/api/v1/books/6a1621b193792d8e85f801cd

## 📚 Design Document

For detailed database design and architecture, see:

-   **[DATABASE_DESIGN.md](DATABASE_DESIGN.md)** - Complete schema design with relationships


## 👥 Author

-   Alaa Soufi
