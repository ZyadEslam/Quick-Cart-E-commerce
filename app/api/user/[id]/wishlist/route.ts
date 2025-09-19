import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "../../../../models/user";
interface Params {
  params: Promise<{ id: string }>;
}
export async function GET(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    console.log(id);
    const userFound = await User.findById(id).populate("wishlist");
    console.log(userFound.wishlist);

    if (userFound) {
      const { wishlist } = userFound;
      return NextResponse.json(wishlist, { status: 200 });
    } else {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }
  } catch (err) {
    NextResponse.json(err, { status: 500 });
    console.log(err);
  }
}
export async function POST(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    const { wishlistToAdd } = await req.json();
    console.log("newWishlist: ", wishlistToAdd);
    console.log("userId: ", id);
    const loggedUser = await User.findOne({ _id: id });

    if (!loggedUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Replace the user's wishlist with the new wishlist from the request
    loggedUser.wishlist = wishlistToAdd;
    await loggedUser.save();
    return NextResponse.json(
      { message: "Wishlist updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
