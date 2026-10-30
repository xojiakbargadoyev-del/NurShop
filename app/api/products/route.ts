import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    products: [
      { id: "1", name: "AirPods Pro", price: 2990000, stock: 12 },
      { id: "2", name: "Smart TV 55\"", price: 8950000, stock: 6 }
    ]
  });
}

export async function POST() {
  return NextResponse.json({ message: "Product created" }, { status: 201 });
}
