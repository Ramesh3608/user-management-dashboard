# User Management Dashboard

A responsive React application for managing users with full CRUD operations via the JSONPlaceholder REST API.

## Features

- **View** all users in a sortable, paginated table
- **Search** users in real-time across first name, last name, and email
- **Filter** via popup panel (first name, last name, email, department)
- **Sort** by any column (click column headers), ascending and descending
- **Add** new users with a validated modal form
- **Edit** existing users with a pre-populated form
- **Delete** users with a confirmation safety prompt
- **Pagination** with page size options (10, 25, 50, 100)
- **Responsive** design — works on mobile, tablet, and desktop
- **Error handling** with user-friendly toast notifications

## Tech Stack

- React 18 (Hooks: useState, useEffect, useMemo, useCallback)
- Vite (build tool)
- Axios (HTTP requests)
- CSS Modules (scoped styling)
- JSONPlaceholder API

## Setup & Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/
│   └── userService.js       # Axios API layer (GET, POST, PUT, DELETE)
├── components/
│   ├── Header.jsx            # Top bar with branding and Add User button
│   ├── SearchBar.jsx         # Real-time search input + Filter button
│   ├── FilterPopup.jsx       # Multi-field filter modal
│   ├── UserTable.jsx         # Sortable data table with skeleton loader
│   ├── UserForm.jsx          # Add/Edit modal with validation
│   ├── ConfirmDelete.jsx     # Delete confirmation dialog
│   └── Pagination.jsx        # Page controls with ellipsis
├── hooks/
│   └── useUsers.js           # Central data hook (fetch, CRUD, search, filter, sort, paginate)
├── utils/
│   ├── constants.js          # API URL, departments, page sizes
│   ├── helpers.js            # Data mapping, avatar initials, department colors
│   └── validators.js         # Form validation functions
├── styles/
│   └── global.css            # CSS variables, resets, shared animations
├── App.jsx                   # Root layout and modal orchestration
└── main.jsx                  # Entry point
```

## Engineering Assumptions

1. **Name Splitting**: JSONPlaceholder provides a single `name` field. It is split at the first space — everything before is `firstName`, everything after is `lastName`. Example: `"Leanne Graham"` → `firstName: "Leanne"`, `lastName: "Graham"`.

2. **Department Assignment**: JSONPlaceholder users have no department field. Departments are assigned cyclically from the list `[Engineering, Marketing, Sales, HR, Finance, IT, Design, Operations]` based on the user's array index.

3. **API Simulation**: JSONPlaceholder does not actually persist changes. POST/PUT/DELETE return simulated success responses. The UI reflects changes via local state management.

4. **ID Generation**: Newly added users receive a generated ID combining `Date.now()` and a random offset since JSONPlaceholder returns the same simulated ID for every POST.

## Challenges

- **Read-only backend**: JSONPlaceholder does not persist mutations. Overcome by updating local React state immediately after a successful API response, keeping the UI in sync.
- **Missing fields**: No `firstName`, `lastName`, or `department` fields in the API response. Solved with deterministic mapping logic documented above.

## Potential Improvements

- Real backend with a persistent database (e.g., PostgreSQL + Node.js)
- Authentication and role-based access control
- Bulk delete / bulk edit operations
- Virtualized list rendering for very large datasets
- Export to CSV / Excel
- Advanced sorting (multi-column)
- Optimistic updates with rollback on error
