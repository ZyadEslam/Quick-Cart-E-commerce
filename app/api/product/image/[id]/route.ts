import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/models/product";
import connectDB from "@/app/utils/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const url = new URL(request.url);
    const imageIndex = parseInt(url.searchParams.get("index") || "0");

    console.log(`Fetching image for product ${id}, index ${imageIndex}`);

    const product = await Product.findById(id);

    if (!product) {
      console.error(`Product not found with ID: ${id}`);
      return new NextResponse("Product not found", { status: 404 });
    }

    if (!product.imgSrc || !product.imgSrc[imageIndex]) {
      console.error(`Image not found for product ${id} at index ${imageIndex}`);
      console.error(`Product has ${product.imgSrc?.length || 0} images`);
      return new NextResponse("Image not found", { status: 404 });
    }

    const imageBuffer = product.imgSrc[imageIndex];

    // Check if the buffer is valid
    if (!imageBuffer || !imageBuffer.data || imageBuffer.data.length === 0) {
      console.error(
        `Invalid image buffer for product ${id}, index ${imageIndex}`
      );
      return new NextResponse("Invalid image data", { status: 500 });
    }

    // Convert Buffer to Uint8Array
    const uint8Array = new Uint8Array(imageBuffer.data);

    console.log(
      `Serving image for product ${id}, size: ${uint8Array.length} bytes`
    );

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000",
        "Content-Length": uint8Array.length.toString(),
        "Access-Control-Allow-Origin": "*", // Add this if needed
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    // console.error("Error stack:", error.stack);
    return new NextResponse("Error serving image", { status: 500 });
  }
}
