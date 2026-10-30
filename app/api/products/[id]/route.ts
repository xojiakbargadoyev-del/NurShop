import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, product: null });
}

export async function PUT() {
  return NextResponse.json({ message: "Product updated" });
}

export async function DELETE() {
  return NextResponse.json({ message: "Product deleted" });
}
