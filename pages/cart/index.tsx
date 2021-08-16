import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { CartItem } from '../products/[id]';

type Sign = '+' | '-';

const CartPage: FC = () => {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const cartList: CartItem[] = JSON.parse(localStorage.getItem("cart")!) || [];
    setCartList(cartList)
    let totalPrice = 0;
    let cartCount = 0;
    cartList.forEach(list => {
      cartCount += list.quantity;
      totalPrice += list.product.price * list.quantity;
    })
    setCartCount(cartCount)
    setTotalPrice(totalPrice)
  }, [])

  const order = () => {
    window.alert("注文しました");
    localStorage.removeItem('cart')
    router.push('/')
  }

  const changeCount = (sign: Sign ,idx: number): void => {
    let newCartList: CartItem[] = cartList.concat();
    if (sign === '+') {
      newCartList[idx].quantity++;
      setCartCount(cartCount + 1);
    } else if (sign === '-') {
      if (newCartList[idx].quantity >= 1) {
        newCartList[idx].quantity--;
        setCartCount(cartCount - 1)
      }
    }
    setCartList(newCartList);
  }

  return (
    <>
      <Layout cartCount={cartCount}/>
      <ul>
        {cartList.map((list: CartItem, idx: number) => {
          return(
            <li key={list.product.id}>
              <img src={list.product.imageUrl} alt={`${list.product.name}の写真`} />
              <div>{list.product.name} {list.product.price}円</div>
              <div>{list.quantity}個</div>
              <button onClick={() => changeCount("+", idx)}>+</button>
              <button onClick={() => changeCount("-", idx)}>-</button>
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
