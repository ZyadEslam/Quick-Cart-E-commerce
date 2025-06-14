export const bufferToBase64 = (buffer) => {
  if (!buffer) return null;
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
};

export const getProductImages = (product) => {
  if (!product?.imgSrc) return [];
  return product.imgSrc.map(bufferToBase64).filter(Boolean);
};
