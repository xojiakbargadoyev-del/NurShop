import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, order: null });
}

export async function POST() {
  return NextResponse.json({ message: "Order created" }, { status: 201 });
}
