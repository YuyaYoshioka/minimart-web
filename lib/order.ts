import { CartItem } from "../pages/products/[id]";
import { graphqlRequest } from "./graphqlClient";

type OrderId = {
  id: string,
}

type PickupLocation = {
  name: string,
}

export type Order = {
  id: string,
  orderedAt: Date,
  deliveryDate: Date,
  pickupLocation: PickupLocation,
  totalAmount: number,
  items: CartItem[],
}

type OrderItemInput = {
  productId: string,
  quantity: number,
}

const getOrderQuery = `
query getOrder($id: ID!) {
  order(id: $id) {
    id
    orderedAt
    deliveryDate
    totalAmount
    pickupLocation {
      name
    }
    items {
      product {
        id
        name
        price
        imageUrl
      }
      quantity
    }
  }
}
`

const postOrderQuery = `
mutation postOrder($items: [OrderItemInput!]!) {
  createOrder(input: { items: $items }) {
    order {
      id
    }
  }
}
`;

export async function postOrder(orderItemInput: OrderItemInput[]): Promise<OrderId> {
  const data = await graphqlRequest({ query: postOrderQuery, variables: { items: orderItemInput } });
  return data.createOrder.order;
}


export async function getOrder(id: string): Promise<Order> {
  const data = await graphqlRequest({ query: getOrderQuery, variables: { id: id } });
  return data.order;
}
