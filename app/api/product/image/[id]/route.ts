// app/api/product/image/[id]/route.ts
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

    if (!product.imgSrc || product.imgSrc.length === 0) {
      console.error(`No images found for product ${id}`);
      return new NextResponse("No images found", { status: 404 });
    }

    if (imageIndex >= product.imgSrc.length) {
      console.error(
        `Image index ${imageIndex} out of bounds for product ${id}`
      );
      return new NextResponse("Image index out of bounds", { status: 404 });
    }

    const imageData = product.imgSrc[imageIndex];

    // Check if the image data is valid (not empty)
    if (!imageData || imageData === "") {
      console.error(`Empty image data for product ${id}, index ${imageIndex}`);
      return new NextResponse("Empty image data", { status: 404 });
    }

    // Convert base64 to buffer
    let imageBuffer;
    try {
      // Handle both Binary.createFromBase64 objects and plain base64 strings
      const base64String =
        typeof imageData === "object" && imageData.base64
          ? imageData.base64
          : imageData;

      // Remove data URL prefix if present
      const cleanBase64 = base64String.replace(/^data:image\/\w+;base64,/, "");
      imageBuffer = Buffer.from(cleanBase64, "base64");
    } catch (error) {
      console.error(`Error converting base64 to buffer: ${error}`);
      return new NextResponse("Invalid image format", { status: 500 });
    }

    console.log(
      `Serving image for product ${id}, size: ${imageBuffer.length} bytes`
    );

    // Return the image buffer
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000",
        "Content-Length": imageBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Error serving image", { status: 500 });
  }
}
