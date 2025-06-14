export async function getProducts() {
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
  return data.products;
}
