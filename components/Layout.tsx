import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

type Props = {
  cartCount: number
};

export const Layout: FC<Props> = ({ 
  children,
  cartCount,
}) => {
  
  return (
    <div>
      <Head>
        <title>Mini Mart</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">Mini Mart</Link>
        </h1>
        <h2>
          <Link href="/user">マイページ</Link>
        </h2>
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
