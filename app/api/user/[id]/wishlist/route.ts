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
    const userFound = await User.findById(id).populate("wishlist");

    if (userFound) {
      const { wishlist } = userFound;
      return NextResponse.json({ wishlist: wishlist || [] }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User Not Found", wishlist: [] }, { status: 404 });
    }
  } catch (err) {
    console.error("Wishlist GET error:", err);
    return NextResponse.json({ 
      error: "Failed to fetch wishlist", 
      message: err instanceof Error ? err.message : String(err),
      wishlist: []
    }, { status: 500 });
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
    
    loggedUser.wishlist = wishlistToAdd;
    await loggedUser.save();
    
    return NextResponse.json(
      { message: "Wishlist updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json({ 
      message: "Failed to update wishlist",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}