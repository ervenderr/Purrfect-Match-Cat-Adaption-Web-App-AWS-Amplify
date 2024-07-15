/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCat = /* GraphQL */ `
  query GetCat($id: ID!) {
    getCat(id: $id) {
      id
      name
      breed
      age
      status
      description
      image
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listCats = /* GraphQL */ `
  query ListCats(
    $filter: ModelCatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        breed
        age
        status
        description
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
