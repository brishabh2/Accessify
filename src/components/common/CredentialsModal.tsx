import { useState } from "react";
import { FaKey } from "react-icons/fa";

export default function CredentialsModal() {
  const [open, setOpen] = useState(false);

  const creds = [
    {
      role: "Super Admin",
      email: "superadmn@example.com",
      password: "123",
    },
    {
      role: "Admin",
      email: "admin@example.com",
      password: "123",
    },
    {
      role: "Normal User",
      email: "user@example.com",
      password: "123",
    },
  ];

  return (
    <div>
      {/* Floating Icon */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: "50%",
          right: "20px",
          background: "#007bff",
          color: "#fff",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        <FaKey size={20} />
      </div>

      {/* Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            right: "20px",
            background: "#fff",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            padding: "20px",
            width: "300px",
            borderRadius: "10px",
            zIndex: 10000,
          }}
        >
          <h3>Credentials</h3>
          <ul>
            {creds.map((c, i) => (
              <li key={i} style={{ marginBottom: "10px" }}>
                <strong>{c.role}</strong>
                <br />
                Email: {c.email}
                <br />
                Password: {c.password}
              </li>
            ))}
          </ul>

          <hr />
          <p style={{ fontSize: "14px", color: "#555" }}>
            <strong style={{ color: "red" }}>
              For checking the login flow, make sure to run the JSON Server
              first.
            </strong>
            <br />
            To fetch Users and Products, run JSON Server:
            <br />
            <code>http://localhost:5000/users</code>
            <br />
            <code>http://localhost:5000/products</code>
          </p>

          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              marginTop: "10px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
