"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddInternshipForm( {onAdd} : {onAdd: () => void} )
{
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        status: "Applied",
        appliedDate: new Date().toISOString().split("T")[0],
        notes: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/internships", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        onAdd();
        setFormData({
            company: "",
            position: "",
            status: "Applied",
            appliedDate: new Date().toISOString().split("T")[0],
            notes: ""
        });
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <Input 
                placeholder="Company" 
                value = {formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
            />

            <Input 
                placeholder="Position" 
                value = {formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                required
            />
            
            <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full p-2 border rounded"
            >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
            </select>

            <Input 
                type="date" 
                value={formData.appliedDate}
                onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
                required
            />

            <textarea
                placeholder="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full p-2 border rounded" 
            />

            <Button type="submit">Add Internship</Button>
        </form>
    )
}