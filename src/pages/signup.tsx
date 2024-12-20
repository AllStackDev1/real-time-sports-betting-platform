/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuthStore } from "../stores/auth.store";
import { z } from "zod";
import { useAlert } from "../hooks";
import Input from "../components/Input";
import Button from "../components/Button";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup, isSubmitting } = useAuthStore((state) => state);

  useAlert("auth");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const SignupSchema = z.object({
      username: z.string().min(1),
      password: z
        .string()
        .min(6)
        .regex(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
          )
        ),
    });
    const parsed = SignupSchema.safeParse({ username, password });
    if (!parsed.success) {
      setError("Invalid credentials");
      return;
    }
    setError("");
    try {
      await signup(parsed.data);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold">Sign Up</h1>
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

          <Button title="Signup" isLoading={isSubmitting} />

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
