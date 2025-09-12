import { NextResponse } from "next/server";
import Address from "@/app/models/address";
import connectDB from "@/app/utils/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const addressData = await req.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "phone",
      "pinCode",
      "address",
      "city",
      "state",
    ];
    const missingFields = requiredFields.filter((field) => !addressData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: `Missing required fields: ${missingFields.join(", ")}`,
          success: false,
        },
        { status: 400 }
      );
    }

    const address = await Address.create(addressData);

    return NextResponse.json(
      {
        message: "Address created successfully",
        address,
        success: true,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating address:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create address";
    return NextResponse.json(
      {
        message: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const addresses = await Address.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Addresses retrieved successfully",
        addresses,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching addresses:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch addresses";
    return NextResponse.json(
      {
        message: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          message: "Address ID is required",
          success: false,
        },
        { status: 400 }
      );
    }

    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return NextResponse.json(
        {
          message: "Address not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Address deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting address:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete address";
    return NextResponse.json(
      {
        message: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}
