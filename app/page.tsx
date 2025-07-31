"use client";
import Image from "next/image";
import AddInternshipForm from "@/components/AddInternshipForm";
import InternshipList from "@/components/InternshipList";
import { useState } from "react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Internship Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Add New Internship</h2>
          <AddInternshipForm onAdd={handleAdd}/>
        </div>
        <InternshipList key={refreshKey} />
      </div>
    </main>
  );
}
