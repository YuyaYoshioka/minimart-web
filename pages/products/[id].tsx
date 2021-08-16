import { FC, useEffect, useState } from 'react';
import { detailProduct, Product } from "../../lib/product";
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { calculateCartCount } from '../../lib/cartCount';

// カートに追加するデータの型
export type CartItem = {
  product: Product; // 商品
  quantity: number; // 個数
};

const ProductDetail: FC = () => {
  const [product, setProduct] = useState<Product>();
  const [cartCount, setCartCount] = useState<number>(0);
  const router = useRouter();
  const id = router.query.id as string;

  const addToCart = () => {
    let newCartList: CartItem[] = [];
    if (!localStorage.getItem("cart")) {
      newCartList = new Array({
        product: product!,
        quantity: 1,
      })
    } else {
      const cartList: CartItem[] = JSON.parse(localStorage.getItem("cart") || '[]');
      const item = cartList.find(element => element.product.id === product?.id)
      if (item) {
        item.quantity++;
      } else {
        const newItem: CartItem = {
          product: product!,
          quantity: 1,
        };
        cartList.push(newItem)
      }
      newCartList = cartList;
    }
    localStorage.setItem("cart", JSON.stringify(newCartList));
    setCartCount(cartCount + 1);
  }

  useEffect(() => {
    setCartCount(calculateCartCount());
    if (!id) return;
    detailProduct(id)
      .then((product) => {
        setProduct(product)
      }
      );
  }, [id])

  return (
    <>
      <Layout
        cartCount={cartCount}
      />
      <img src={product?.imageUrl} alt={`${product?.name}の写真`} />
      <div>{product?.name}</div>
      <div>{product?.price}円</div>
      <div>{product?.description}</div>
      <button onClick={() => addToCart()}>カートに追加する</button>
    </>
  );
}

export default ProductDetail;
