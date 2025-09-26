import { NextResponse } from "next/server";
import Order from "../../models/order";
import dbConnect from "@/lib/mongoose";
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userId, addressId, products, totalPrice } = await req.json();
    if (
      !userId ||
      !addressId ||
      !products ||
      products.length === 0 ||
      !totalPrice
    ) {
      console.log(userId, addressId, products, totalPrice);

      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newOrder = new Order({
      userId,
      addressId,
      products,
      totalPrice: +totalPrice,
      date: new Date().toISOString(),
      orderState: "Pending",
    });
    await newOrder.save();

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        orderId: newOrder._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to place order" },
      { status: 500 }
    );
  }
}
