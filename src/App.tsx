import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/common/Layout";
import UsersPage from "./pages/Users";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin", "user"]}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["user", "admin", "superadmin"]}>
              <Layout>
                <CartPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute allowedRoles={["user", "admin", "superadmin"]}>
              <Layout>
                <Shop />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin", "user"]}>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <Layout>
                <UsersPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
