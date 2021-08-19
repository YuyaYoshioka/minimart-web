import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { calculateCartCount } from '../../lib/cartCount';
import { getUser, PickupLocation, updateLocation } from '../../lib/user';

const UserPage: FC = () => {
  const [user, setUser] = useState<string>("");
  const [cartCount, setCartCount] = useState<number>(0);
  const [pickupLocations, setPickupLocations] = useState<PickupLocation[]>([]);
  const [currentPickupLocation, setCurrentPickupLocation] = useState<string>('');

  useEffect(() => {
    setCartCount(calculateCartCount());
    getUser()
      .then(user => {
        setUser(user.viewer.name);
        setPickupLocations(user.pickupLocations);
        setCurrentPickupLocation(user.viewer.pickupLocation.id);
      })
  }, [])

  const changeLocation = (id: string) => {
    updateLocation(id)
      .then(() => {
        setCurrentPickupLocation(id)
      })
  }

  return (
    <Layout
      cartCount={cartCount}
    >
      <h1>ユーザー名</h1>
      {user}
      <h1>受け取り場所の設定</h1>
      <select onChange={(e) => changeLocation(e.target.value)} value={currentPickupLocation}>
        {pickupLocations.map(location => {
          return(
            <option key={location.id} value={location.id}>{location.name}</option>
          );
        })}
      </select>
    </Layout>
  );
}

export default UserPage;