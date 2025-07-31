import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all internships
export async function GET() 
{
  const internships = await prisma.internship.findMany();
  return NextResponse.json(internships);
}

// POST a new internship
export async function POST(request: Request)
{
    const data = await request.json();
    const newInternship = await prisma.internship.create({
        data: {
            company: data.company,
            position: data.position,
            status: data.status,
            appliedDate: new Date(data.appliedDate),
            notes: data.notes || "Nothing",
        },
    });
    return NextResponse.json(newInternship);
}
