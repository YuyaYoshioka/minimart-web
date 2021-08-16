import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { CartItem } from '../products/[id]';

const CartPage: FC = () => {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const cartList: CartItem[] = JSON.parse(localStorage.getItem("cart")!) || [];
    setCartList(cartList)
    let totalPrice = 0;
    cartList.forEach(list => {
      totalPrice += list.product.price * list.quantity;
    })
    setTotalPrice(totalPrice)
  }, [])

  const order = () => {
    window.alert("注文しました");
    localStorage.removeItem('cart')
    router.push('/')
  }

  return (
    <>
      <Layout/>
      <ul>
        {cartList.map((list: CartItem) => {
          return(
            <li key={list.product.id}>
              <img src={list.product.imageUrl} alt={`${list.product.name}の写真`} />
              <div>{list.product.name} {list.product.price}円</div>
              <div>{list.quantity}個</div>
            </li>
        )
        })}
      </ul>
      <div>合計:{totalPrice}円</div>
      <button onClick={() => order()}>注文する</button>
    </>
  );
}

export default CartPage;
