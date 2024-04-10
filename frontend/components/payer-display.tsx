"use client";

import { useEffect, useState } from 'react';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";

export default function PayerDisplay() {
  const [payers, setPayers] = useState([]);

  useEffect(() => {
    const fetchPayers = async () => {
      const apiUrl = "https://testwork-g1it.onrender.com";
      try {
        console.log(apiUrl)
        const response = await fetch(`${apiUrl}/payers`);
        console.log(response)
        const data = await response.json();
        setPayers(data);
      } catch (error) {
        console.error('Error fetching payers:', error);
      }
    };

    fetchPayers();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Payer ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payers.map((payer: { payer_id: number, name: string, description: string }) => (
          <TableRow key={payer.payer_id}>
            <TableCell className="font-medium">P{payer.payer_id.toString().padStart(3, '0')}</TableCell>
            <TableCell>{payer.name}</TableCell>
            <TableCell>{payer.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
