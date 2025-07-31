"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

type Internship = {
    id: number;
    company: string;
    position: string;
    status: string;
    appliedDate: string;
    notes?: string;
};

export default function EditInternshipDialog({
    internship,
    onSave
}: {
    internship: Internship,
    onSave: () => void
}) {
    const [formData, setFormData] = useState({
        company: internship.company,
        position: internship.position,
        status: internship.status,
        appliedDate: internship.appliedDate,
        notes: internship.notes || ""
    });
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`/api/internships/${internship.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
        onSave()
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Internship</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <Input
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                    />
                    <Input
                        placeholder="Position"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        required
                    />
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="applied">Applied</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offered">Offered</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <Input
                        type="date"
                        value={formData.appliedDate}
                        onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                        required
                    />
                    <Input
                        placeholder="Notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    <Button type="submit">Save</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}