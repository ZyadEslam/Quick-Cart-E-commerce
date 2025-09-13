import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "../../../../models/user";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const userFound = await User.findById(id);

    if (userFound) {
      const { cart } = userFound;
      return NextResponse.json(cart, { status: 200 });
    } else {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }
  } catch (err) {
    NextResponse.json(err, { status: 500 });
    console.log(err);
  }
}

export async function POST(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { cartToAdd } = await req.json();

    const loggedUser = await User.findOne({ _id: id });

    if (!loggedUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Replace the user's cart with the new cart from the request
    loggedUser.cart = cartToAdd;
    await loggedUser.save();
    return NextResponse.json(
      { message: "Cart updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
