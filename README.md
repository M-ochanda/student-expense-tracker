\# Student Expense Tracker



\## Project Idea

A web app that helps students record daily expenses, organize them by category, and view simple spending summaries.



\## Problem

Students often spend money in small amounts every day and lose track of where it goes. This app makes spending visible and easier to manage.



\## Tech Stack

\- Frontend: React

\- Hosting: Azure Static Web Apps

\- Backend: Azure Functions

\- Database: Azure Cosmos DB



\## MVP Features

\- Add expense

\- View all expenses

\- Edit expense

\- Delete expense

\- View weekly/monthly totals

\- Filter by category



\## Planned API Routes

\- POST /api/expenses

\- GET /api/expenses

\- GET /api/expenses/{id}

\- PUT /api/expenses/{id}

\- DELETE /api/expenses/{id}

\- GET /api/summary



\## Expense Document Example

```json

{

&#x20; "id": "exp-001",

&#x20; "title": "Lunch",

&#x20; "amount": 250,

&#x20; "category": "Food",

&#x20; "date": "2026-06-03",

&#x20; "note": "Campus cafeteria",

&#x20; "createdAt": "2026-06-03T10:30:00Z"

}



