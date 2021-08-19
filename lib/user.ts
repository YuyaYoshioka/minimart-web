import { graphqlRequest } from "./graphqlClient";

export type PickupLocation = {
  id: string,
  name: string,
}

type Viewer = {
  name: string,
  pickupLocation: PickupLocation,
}

type UserPage = {
  viewer: Viewer,
  pickupLocations: PickupLocation[],
}

const getUserQuery = `
  query {
    viewer {
      name
      pickupLocation {
        id
        name
      }
    }
    pickupLocations {
      id
      name
    }
  }
`;

const updateLocationQuery = `
mutation updateLocation($id: ID!) {
  updatePickupLocation(input: {pickupLocationId: $id}) {
    pickupLocation {
      id
      name
    }
  }
}
`;

export async function getUser(): Promise<UserPage> {
  const data = await graphqlRequest({ query: getUserQuery});
  return data;
}

export async function updateLocation(id: string): Promise<PickupLocation> {
  const data = await graphqlRequest({ query: updateLocationQuery, variables: { id: id } });
  return data;
}