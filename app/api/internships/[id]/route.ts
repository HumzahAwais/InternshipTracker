import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validate ID
    if (isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid internship ID" },
        { status: 400 }
      );
    }

    await prisma.internship.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete internship" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    // Validate ID
    if (isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid internship ID" },
        { status: 400 }
      );
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update internship" },
      { status: 500 }
    );
  }
}