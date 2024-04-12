"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AddPayer } from "./add-payer"
import { useState } from 'react'
import { AddProvider } from './add-provider';

export function Dashboard() {
  // const router = useRouter()

const [token, setToken] = useState(localStorage.getItem('token'));

useEffect(() => {
  const intervalId = setInterval(() => {
    const newToken = localStorage.getItem('token');
    if (newToken !== token) {
      setToken(newToken);
    }
  }, 1000); // Check every second

  return () => clearInterval(intervalId); // Clean up on unmount
}, [token]);

useEffect(() => {
  if (!token) {
    window.location.href = "/login";
  }
}, [token]);

  return (
    <div className="grid h-screen w-full items-start gap-4 p-4 md:items-center md:gap-8 md:p-6">
      <div className="grid gap-2">
        <h1 className="font-semibold text-3xl">Payers & Providers</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your list of payers and providers</p>
      </div>
    <AddPayer />
    <AddProvider />
    </div>
  )
}