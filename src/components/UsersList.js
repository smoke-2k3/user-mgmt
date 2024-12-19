import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ first_name: "", last_name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if token is missing
    } else {
      fetchUsers(page);
    }
  }, [page, navigate]);

  const fetchUsers = async (page) => {
    setError("");
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setUpdatedUser({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${editingUser}`, updatedUser);
      setUsers(users.map((user) => (user.id === editingUser ? { ...user, ...updatedUser } : user)));
      setEditingUser(null);
    } catch (err) {
      setError("Failed to update user. Please try again later.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Users List</h1>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.userGrid}>
        {users.map((user) => (
          <div key={user.id} style={styles.userCard}>
            <img src={user.avatar} alt={user.first_name} style={styles.avatar} />
            {editingUser === user.id ? (
              <div style={styles.editForm}>
                <input
                  type="text"
                  value={updatedUser.first_name}
                  onChange={(e) => setUpdatedUser({ ...updatedUser, first_name: e.target.value })}
                  placeholder="First Name"
                  style={styles.input}
                />
                <input
                  type="text"
                  value={updatedUser.last_name}
                  onChange={(e) => setUpdatedUser({ ...updatedUser, last_name: e.target.value })}
                  placeholder="Last Name"
                  style={styles.input}
                />
                <input
                  type="email"
                  value={updatedUser.email}
                  onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                  placeholder="Email"
                  style={styles.input}
                />
                <button onClick={handleUpdate} style={styles.button}>Update</button>
                <button onClick={() => setEditingUser(null)} style={styles.cancelButton}>Cancel</button>
              </div>
            ) : (
              <>
                <p style={styles.name}>{`${user.first_name} ${user.last_name}`}</p>
                <p style={styles.email}>{user.email}</p>
                <button onClick={() => handleEdit(user)} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(user.id)} style={styles.deleteButton}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div style={styles.pagination}>
        <button onClick={handlePrevious} disabled={page === 1} style={styles.button}>
          Previous
        </button>
        <span style={styles.pageInfo}>{`Page ${page} of ${totalPages}`}</span>
        <button onClick={handleNext} disabled={page === totalPages} style={styles.button}>
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  userGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
  },
  userCard: {
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "0.5rem",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  email: {
    fontSize: "1rem",
    color: "#666",
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.5rem 1rem",
    margin: "0.5rem 0",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  cancelButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
  pageInfo: {
    fontSize: "1rem",
    margin: "0 1rem",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
  },
};

export default UsersList;
