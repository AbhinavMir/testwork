"use client";

import { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AddPayer() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch('https://testwork-g1it.onrender.com/payers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
      });
  
      let data;
      try {
        data = await response.json();
      } catch (error) {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status} ${await response.text()}`);
        }
      }
  
      if (!response.ok) {
        throw new Error(`Error submitting payer: ${JSON.stringify(data)}`);
      }
  
      console.log(data);
    } catch (error) {
      console.error((error as Error).message);
    }
  }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit payer</CardTitle>
        <CardDescription>Add a new paying agency.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  )
}