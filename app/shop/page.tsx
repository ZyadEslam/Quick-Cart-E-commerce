import React from "react";
import ProductsGroup from "../components/ProductsGroup";

const ShopPage = async () => {
  const res = await fetch("http://localhost:3000/api/product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
  });
  const data = await res.json();
  const products = data.products;

  return (
    <div className="md:px-[8.5%] sm:px-[5%]">
      <div className="mb-12">
        <h2 className={`text-[22px] font-medium underlined-header w-fit pt-10`}>
          All products
        </h2>
      </div>
      <ProductsGroup products={products} />
    </div>
  );
};

export default ShopPage;
