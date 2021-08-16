import { graphqlRequest } from "./graphqlClient";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

const listProductsQuery = `
  query listProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

const detailProductQuery = `
  query detailProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export async function listProducts(): Promise<Product[]> {
  const data = await graphqlRequest({ query: listProductsQuery });
  return data.products;
}

export async function detailProduct(id: string): Promise<Product> {
  const data = await graphqlRequest({ query: detailProductQuery, variables: { id: id } });
  return data.product;
}
