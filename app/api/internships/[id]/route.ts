import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
    const { id } = await request.json();
    await prisma.internship.delete({
        where: { id: Number(id) },
    });
    return NextResponse.json({ success: true });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const data = await request.json();

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