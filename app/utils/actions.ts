export const addProduct = async (formData: FormData) => {
  try {
    const image1: File = formData.get("image1") as File;
    const image2: File = formData.get("image2") as File;
    const image3: File = formData.get("image3") as File;
    const image4: File = formData.get("image4") as File;

    const image1Buffer = await image1.arrayBuffer();
    const image2Buffer = await image2.arrayBuffer();
    const image3Buffer = await image3.arrayBuffer();
    const image4Buffer = await image4.arrayBuffer();
    // Create array of image files, filtering out null values

    const buffer1 = Buffer.from(image1Buffer);
    const buffer2 = Buffer.from(image2Buffer);
    const buffer3 = Buffer.from(image3Buffer);
    const buffer4 = Buffer.from(image4Buffer);
    const imgFiles = [buffer1, buffer2, buffer3, buffer4].filter(Boolean);

    const product = {
      name: formData.get("name"),
      description: formData.get("description"),
      rating: Number(formData.get("rating")),
      price: Number(formData.get("price")),
      oldPrice: formData.get("oldPrice")
        ? Number(formData.get("oldPrice"))
        : undefined,
      discount: formData.get("discount")
        ? Number(formData.get("discount"))
        : undefined,
      category: formData.get("category"),
      brand: formData.get("brand"),
      imgSrc: imgFiles,
    };

    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      throw new Error("Failed to add product");
    }
    return res.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// shipping form action removed in favor of client-side submission in page component

export const shippingFormAction = async (
  prevState: { success: boolean; message: string },
  formData: FormData
) => {

  try {
    const addressData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      pinCode: formData.get("pinCode") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
    };

    // Validate required fields
    const requiredFields = [
      "name",
      "phone",
      "pinCode",
      "address",
      "city",
      "state",
    ];
    const missingFields = requiredFields.filter(
      (field) => !addressData[field as keyof typeof addressData]
    );

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      };
    }

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/order-address`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      }
    );

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: "Address created successfully!",
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to create address",
      };
    }
  } catch (error) {
    console.error("Error creating address:", error);
    return {
      success: false,
      message: "Failed to create address. Please try again.",
    };
  }
};
