import { FC, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";
import { CartItem } from "../pages/products/[id]";

type Props = {};

export const Layout: FC<Props> = ({ children }) => {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    if (!localStorage.getItem('cart')) return;
    const cartList: CartItem[] = JSON.parse(localStorage.getItem("cart")!);
    let cartCount = 0;
    cartList!.forEach(list => {
      cartCount += list.quantity
    })
    setCartCount(cartCount)
  }, [])
  
  return (
    <div>
      <Head>
        <title>Mini Mart</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">Mini Mart</Link>
        </h1>
        <div className={styles.cart}>
          <Link href="/cart">
            <a>
              <span>🛒</span>
              <span className={styles.cartCount}>({cartCount})</span>
            </a>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
