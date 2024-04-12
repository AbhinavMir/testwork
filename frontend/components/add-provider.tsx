"use client";

import { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AddProvider() {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [NPI_number, setNPI_Number] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://testwork-g1it.onrender.com/providers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, specialty, NPI_number, email, phone_number })
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
        throw new Error(`Error submitting provider: ${JSON.stringify(data)}`);
      }

      console.log(data);
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Provider</CardTitle>
        <CardDescription>Add a new provider.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Input id="specialty" placeholder="Specialty" value={specialty} onChange={e => setSpecialty(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="NPI_number">NPI Number</Label>
            <Input id="NPI_number" placeholder="NPI Number" value={NPI_number} onChange={e => setNPI_Number(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input id="phone_number" placeholder="Phone Number" value={phone_number} onChange={e => setPhoneNumber(e.target.value)} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  )
}
