"use client";

import { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Spinner from "@/components/ui/spinner";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "./ui/button";
interface Payer {
  payer_id: number;
  name: string;
  description: string;
}
export default function PayerDisplay() {
  const [payers, setPayers] = useState<Payer[]>([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading status

const handleDelete = async (payerId: number) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`https://testwork-g1it.onrender.com/payers/${payerId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete');
    setPayers((prevPayers: Payer[]) => prevPayers.filter(payer => payer.payer_id !== payerId));
  } catch (error) {
    console.error('Error:', error);
  }
};

  
  useEffect(() => {
    const fetchPayers = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      const apiUrl = "https://testwork-g1it.onrender.com";
      try {
        console.log(apiUrl);
        const response = await fetch(`${apiUrl}/payers`);
        // console.log(response)
        console.log(response);
        const data = await response.json();
        setPayers(data);
      } catch (error) {
        console.error("Error fetching payers:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchPayers();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Payer ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payers.map(
          (payer: { payer_id: number; name: string; description: string }) => (
            <TableRow key={payer.payer_id}>
              <TableCell className="font-medium">
                P{payer.payer_id.toString().padStart(3, "0")}
              </TableCell>
              <TableCell>{payer.name}</TableCell>
              <TableCell>{payer.description}</TableCell>
              <TableCell>
                <IconButton aria-label="delete" color="secondary">
                  <Button onClick={() => handleDelete(payer.payer_id)}>
                    <DeleteIcon />
                  </Button>
                </IconButton>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
