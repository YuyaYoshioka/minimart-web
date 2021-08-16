import { CartItem } from "../pages/products/[id]";

export const calculateCartCount = () => {
  let cartCount = 0;
  const cartList: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  cartList.forEach(element => {
    cartCount += element.quantity
  });
  return cartCount;
}