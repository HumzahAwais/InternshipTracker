"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import EditInternshipDialog from "./EditInternshipDialog";

type Internship = {
  id: number;
  company: string;
  position: string;
  status: string;
  appliedDate: string;
  notes?: string;
};

export default function InternshipList() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInternships = async () => {
    try {
      const response = await fetch('/api/internships');
      if (!response.ok) throw new Error('Failed to fetch internships');
      const data = await response.json();
      setInternships(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch internships');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this internship?')) {
      try {
        const response = await fetch(`/api/internships/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete internship');
        fetchInternships();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete internship');
      }
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Your Internships</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {internships.map((internship) => (
            <TableRow key={internship.id}>
              <TableCell>{internship.company}</TableCell>
              <TableCell>{internship.position}</TableCell>
              <TableCell>{internship.status}</TableCell>
              <TableCell>{new Date(internship.appliedDate).toLocaleDateString()}</TableCell>
              <TableCell>{internship.notes}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <EditInternshipDialog internship={internship} onSave={fetchInternships} />
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleDelete(internship.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}