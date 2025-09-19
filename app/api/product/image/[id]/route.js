import { NextResponse } from "next/server";
import Product from "@/app/models/product";
import connectDB from "@/app/utils/db";

export const dynamic = "force-static";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const imageIndex = parseInt(searchParams.get("index") || "0");

    const product = await Product.findById(id);
    if (!product || !product.imgSrc[imageIndex]) {
      console.log("Image not found");
      return new NextResponse("Image not found", { status: 404 });
    }

    const imageBuffer = product.imgSrc[imageIndex];
    console.log("Image Buffer : ", imageBuffer);

    // Convert Buffer to Uint8Array
    const uint8Array = new Uint8Array(imageBuffer.data);

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000",
        "Content-Length": imageBuffer.length.toString(),
      },
    });
    // return new NextResponse(imageBuffer, {
    //   headers: {
    //     "Content-Type": "image/jpeg",
    //     "Cache-Control": "public, max-age=31536000",
    //     "Content-Length": imageBuffer.length.toString(),
    //   },
    // });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Error serving image", { status: 500 });
  }
}
