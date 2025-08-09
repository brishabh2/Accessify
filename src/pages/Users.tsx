import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import type { User } from "../context/AuthContext";

const UsersPage = () => {
  const { users, addUser, deleteUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    role: "user" as User["role"],
  });

  const handleDelete = async (id: number) => {
    await deleteUser(id);
  };

  const handleCreate = async () => {
    if (!newUser.name.trim()) return;
    console.log(users.length);
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    console.log(id, "id");
    await addUser({
      name: newUser.name,
      email: `${newUser.name.toLowerCase()}@example.com`,
      password: "123",
      role: newUser.role,
    });

    setShowModal(false);
    setNewUser({ name: "", role: "user" });
  };

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <Button
        variant="primary"
        className="my-3"
        onClick={() => setShowModal(true)}
      >
        Add User
      </Button>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    role: e.target.value as User["role"],
                  })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersPage;
