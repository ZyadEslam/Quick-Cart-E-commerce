import { NextResponse } from "next/server";
import Product from "@/app/models/product";
import connectDB from "@/app/utils/db";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    // Convert to plain object and keep the image data
    const productObj = product.toObject();

    // Instead of converting to base64, we'll use the image API endpoint
    productObj.imgSrc = productObj.imgSrc.map(
      (_, index) => `/api/product/image/${id}?index=${index}`
    );

    return NextResponse.json(
      { product: productObj, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const {
      name,
      description,
      price,
      oldPrice,
      discount,
      category,
      brand,
      color,
      imgSrc,
    } = await request.json();

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        oldPrice,
        discount,
        category,
        brand,
        color,
        imgSrc,
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully", product, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const {
      name,
      description,
      price,
      oldPrice,
      discount,
      category,
      brand,
      color,
      imgSrc,
    } = await request.json();

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        oldPrice,
        discount,
        category,
        brand,
        color,
        imgSrc,
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully", product, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
