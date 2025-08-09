import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

type Role = "superadmin" | "admin" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface AuthContextType {
  user: Omit<User, "password"> | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (newUser: Omit<User, "role" | "id">) => Promise<void>;
  addUser: (newUser: Omit<User, "id">) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  fetchUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const API_URL = "http://localhost:5000/users";

  // Fetch users from db.json
  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  useEffect(() => {
    const stored = localStorage.getItem("auth-user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser({
        id: parsed.id,
        name: parsed.name,
        email: parsed.email,
        role: parsed.role,
      });
    }
    fetchUsers();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.get(
      `${API_URL}?email=${email}&password=${password}`
    );
    const found = res.data[0];

    if (found) {
      setUser({
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
      });
      localStorage.setItem("auth-user", JSON.stringify(found));
      return true;
    }

    return false;
  };

  const signup = async (newUser: Omit<User, "role" | "id">) => {
    const exists = await axios.get(`${API_URL}?email=${newUser.email}`);
    if (exists.data.length) return;

    await axios.post(API_URL, {
      ...newUser,
      role: "user",
    });
    fetchUsers();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
  };

  const addUser = async (newUser: Omit<User, "id">) => {
    await axios.post(API_URL, newUser);
    fetchUsers();
  };

  const deleteUser = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsers();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        logout,
        signup,
        addUser,
        deleteUser,
        fetchUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
