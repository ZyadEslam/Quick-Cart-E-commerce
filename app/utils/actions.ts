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
