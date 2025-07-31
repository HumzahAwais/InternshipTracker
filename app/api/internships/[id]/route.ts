import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid internship ID" }, { status: 400 });
  }

  await prisma.internship.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await request.json();

  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid internship ID" }, { status: 400 });
  }

  const updatedInternship = await prisma.internship.update({
    where: { id: Number(id) },
    data: {
      company: data.company,
      position: data.position,
      status: data.status,
      appliedDate: new Date(data.appliedDate),
      notes: data.notes,
    },
  });

  return NextResponse.json(updatedInternship);
}
