// app/api/product/image-base64/[id]/route.ts
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

    const product = await Product.findById(id);
    
    if (!product || !product.imgSrc || !product.imgSrc[imageIndex]) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const imageData = product.imgSrc[imageIndex];
    
    // Handle both Binary.createFromBase64 objects and plain base64 strings
    let base64String;
    if (typeof imageData === 'object' && imageData.base64) {
      base64String = imageData.base64;
    } else if (typeof imageData === 'string') {
      base64String = imageData;
    } else {
      return new NextResponse("Invalid image format", { status: 500 });
    }

    // Create data URL
    const dataUrl = `data:image/jpeg;base64,${base64String}`;

    // Return JSON with the data URL
    return NextResponse.json({
      image: dataUrl,
      success: true
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Error serving image", { status: 500 });
  }
}