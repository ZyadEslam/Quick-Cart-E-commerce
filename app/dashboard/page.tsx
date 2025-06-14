"use client";
import Form from "next/form";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { addProduct } from "../utils/actions";

const DashboardPage = () => {
  const [images, setImages] = useState({
    image1: assets.upload_area,
    image2: assets.upload_area,
    image3: assets.upload_area,
    image4: assets.upload_area,
  });

  const fileInputRefs = {
    image1: useRef<HTMLInputElement>(null),
    image2: useRef<HTMLInputElement>(null),
    image3: useRef<HTMLInputElement>(null),
    image4: useRef<HTMLInputElement>(null),
  };

  const handleImageClick = (
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    inputRef.current?.click();
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageKey: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      // const imageUrl = `/assets/${file.name}`;
      console.log(file);
      setImages((prev) => ({
        ...prev,
        [imageKey]: imageUrl,
      }));
    }
    console.log(images);
  };

  const removeImageHandler = (imageKey: string) => {
    setImages((prev) => ({
      ...prev,
      [imageKey]: assets.upload_area,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg ">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <Form action={addProduct} className="flex flex-col gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Product Images
          </label>
          <div className="flex sm:flex-col md:flex-row gap-3">
            {Object.keys(images).map((imageKey, index) => (
              <div className=" md:w-1/4 relative" key={index}>
                <div className="relative">
                  {images[imageKey as keyof typeof images] !==
                    assets.upload_area && (
                    <span
                      className="absolute top-0 cursor-pointer text-gray-500 bg-gray-100 right-0 px-3 py-1 rounded-md"
                      onClick={() => {
                        removeImageHandler(imageKey);
                      }}
                    >
                      X
                    </span>
                  )}
                  <Image
                    src={images[imageKey as keyof typeof images]}
                    alt={`Product image ${index + 1}`}
                    width={100}
                    height={100}
                    className="upload-area"
                    onClick={() =>
                      handleImageClick(
                        fileInputRefs[imageKey as keyof typeof fileInputRefs]
                      )
                    }
                  />
                </div>
                <input
                  type="file"
                  className="hidden"
                  id={`p-image${index + 1}`}
                  name={`image${index + 1}`}
                  ref={fileInputRefs[imageKey as keyof typeof fileInputRefs]}
                  onChange={(e) => handleImageChange(e, imageKey)}
                  accept="image/*"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Click on images to upload (max 4 images)
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="dashboard-input"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="dashboard-input"
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2 md:w-1/2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Product Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="dashboard-input"
              placeholder="Category"
              required
            />
          </div>
          <div className="space-y-2 md:w-1/2">
            <label
              htmlFor="brand"
              className="text-sm font-medium text-gray-700"
            >
              Product Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              className="dashboard-input"
              placeholder="Brand"
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Product Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="dashboard-input"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="oldPrice"
              className="text-sm font-medium text-gray-700"
            >
              Old Price
            </label>
            <input
              type="number"
              id="oldPrice"
              name="oldPrice"
              className="dashboard-input"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="offer-price"
              className="text-sm font-medium text-gray-700"
            >
              Discount
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              className="dashboard-input"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="offer-price"
              className="text-sm font-medium text-gray-700"
            >
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              className="dashboard-input"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <input
            type="submit"
            className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
            value="ADD PRODUCT"
          />
        </div>
      </Form>
    </div>
  );
};

export default DashboardPage;
