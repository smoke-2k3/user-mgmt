# EmployWise Front-End Assignment

This project is a React application designed to interact with the Reqres API to perform basic user management functions. The application supports user login, user list display with pagination, and edit/delete operations on users.

---

## Features

1. **Login Authentication**:
   - Users can log in using credentials.
   - Token is stored in `localStorage`.

2. **User List**:
   - Displays a paginated list of users fetched from the Reqres API.
   - Users' first name, last name, and avatar are displayed.

3. **Edit/Delete Operations**:
   - Edit user details (first name, last name, email).
   - Delete users from the list.

4. **Error Handling**:
   - Displays appropriate error messages for API failures.

5. **Responsive UI**:
   - Designed to work seamlessly on both desktop and mobile.

---

## Prerequisites

Ensure you have the following installed:
- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Comes bundled with Node.js.

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/smoke-2k3/user-mgmt.git
   cd employwise-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```
   - The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── Login.js        # Login component
│   │   └── UsersList.js    # Users list and management component
│   ├── App.js              # Main app entry
│   └── index.js            # React DOM rendering
├── public/
│   └── index.html          # Root HTML file
└── package.json            # Project metadata and dependencies
```

---

## Usage

1. **Login**:
   - Use the credentials:
     - Email: `eve.holt@reqres.in`
     - Password: `cityslicka`

2. **Navigate to Users List**:
   - Upon successful login, you will see a list of users.

3. **Edit/Delete Users**:
   - Click "Edit" to modify user details.
   - Click "Delete" to remove a user from the list.

---

## Technologies Used

- **React**: Front-end framework.
- **Axios**: For HTTP requests.
- **React Router**: For navigation.
- **CSS**: For styling.

---

## Notes

- This project uses the Reqres API, which is a mock API for demonstration purposes. Changes to user data are not persisted.

---