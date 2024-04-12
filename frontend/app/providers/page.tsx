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
  gold_carded_by: string;
  is_eligible: boolean;
  reason: string | null;
  rule_id: number;
  rule_description: string;
  metric: string;
  threshold: string;
}

export default function ProviderDisplay() {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    async function fetchProviders() {
      const apiUrl = "https://testwork-g1it.onrender.com";
      try {
        const response = await fetch(`${apiUrl}/providers`);
        const data: Provider[] = await response.json();
        setProviders(data);
        console.log(data);
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
            <TableHead>Provider ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Gold Carded by</TableHead>
            <TableHead>Eligibility</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Rule ID</TableHead>
            <TableHead>Rule Description</TableHead>
            <TableHead>Metric</TableHead>
            <TableHead>Threshold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map(({
            provider_id,
            name,
            specialty,
            gold_carded_by,
            is_eligible,
            reason,
            rule_id,
            rule_description,
            metric,
            threshold,
          }) => (
            <TableRow key={provider_id}>
              <TableCell>{provider_id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{specialty}</TableCell>
              <TableCell>{gold_carded_by}</TableCell>
              <TableCell>{is_eligible ? "Yes" : "No"}</TableCell>
              <TableCell>{reason || "N/A"}</TableCell>
              <TableCell>{rule_id}</TableCell>
              <TableCell>{rule_description}</TableCell>
              <TableCell>{metric}</TableCell>
              <TableCell>{threshold}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
