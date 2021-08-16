import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { calculateCartCount } from '../../lib/cartCount';
import { getOrder, Order } from '../../lib/order';

const OrderDetail: FC = () => {
  const [order, setOrder] = useState<Order>();
  const [cartCount, setCartCount] = useState<number>(0);
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    setCartCount(calculateCartCount());
    if (!id) return;
    getOrder(id)
      .then(order => {
        setOrder(order)
      })
  }, [id])

  return (
    <>
      <Layout
        cartCount={cartCount}
      />
      <h2>注文の詳細</h2>
      <ul>
        <li>注文日時:{order?.deliveryDate}</li>
        <li>配達日時:{order?.orderedAt}</li>
        <li>受け取り場所:{order?.pickupLocation.name}</li>
      </ul>
      <h2>注文した商品</h2>
        <ul>
          {order?.items.map(item => {
            return (
              <li key={item.product.id}>
                <img src={item.product.imageUrl} alt={`${item.product.name}の写真`} />
                <div>{item.product.name} {item.product.price}円</div>
                <div>{item.quantity}個</div>
              </li>
            );
          })}
        </ul>
      <div>合計:{order?.totalAmount}円</div>
    </>
  );
}

export default OrderDetail;
