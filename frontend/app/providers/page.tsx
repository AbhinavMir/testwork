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
import Navbar from "@/components/navbar";

interface Provider {
  provider_id: number;
  name: string;
  specialty: string;
  goldcarded_by: string;
}

interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <span className={`text-sm font-medium py-1 px-2 rounded-full ${className}`}>
    {children}
  </span>
);
const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
}) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border rounded p-2"
  />
);

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded">
    {children}
  </button>
);

export default function ProviderDisplay() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [newProvider, setNewProvider] = useState({ name: "", specialty: "" });

  useEffect(() => {
    async function fetchProviders() {
      const apiUrl = "https://testwork-g1it.onrender.com";
      try {
        const response = await fetch(`${apiUrl}/providers`);
        const data: Provider[] = await response.json();
        setProviders(data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    }

    fetchProviders();
  }, []);

  return (
    <>
      <Navbar />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Provider ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Goldcarded by</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map(({ provider_id, name, specialty, goldcarded_by }) => (
            <TableRow key={provider_id}>
              <TableCell className="font-medium">
                P{provider_id.toString().padStart(3, "0")}
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{specialty}</TableCell>
              <TableCell>
                <Badge className="bg-yellow-800">{goldcarded_by}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
