"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import bcrypt from "bcryptjs";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch("https://testwork-g1it.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, hashed_password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., store the token, redirect, etc.
        console.log(data.token);
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 m-4">
        <div className="space-y-12">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold">Welcome</h1>
            <p className="max-w-md mx-auto text-gray-500 dark:text-gray-400">
              Enter your information to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
          <Separator className="mx-auto border-gray-200 dark:border-gray-800" />
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don`t have an account?
              <Link className="underline" href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
