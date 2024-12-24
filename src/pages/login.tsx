import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuthStore } from "../stores/auth.store";
import { useAlert } from "../hooks";
import Input from "../components/Input";
import Button from "../components/Button";
import { authValidate } from "../validators";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isSubmitting } = useAuthStore((state) => state);

  // notification hook
  useAlert("auth");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = authValidate({ username, password });
    if (!parsed.success) {
      useAuthStore.setState({ message: "Invalid credentials", status: false });
      return;
    }
    await login(parsed.data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <LogIn className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold">Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button title="Login" isLoading={isSubmitting} />

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
