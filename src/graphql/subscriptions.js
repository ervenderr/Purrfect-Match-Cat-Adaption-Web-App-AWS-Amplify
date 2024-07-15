/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCat = /* GraphQL */ `
  subscription OnCreateCat(
    $filter: ModelSubscriptionCatFilterInput
    $owner: String
  ) {
    onCreateCat(filter: $filter, owner: $owner) {
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
export const onUpdateCat = /* GraphQL */ `
  subscription OnUpdateCat(
    $filter: ModelSubscriptionCatFilterInput
    $owner: String
  ) {
    onUpdateCat(filter: $filter, owner: $owner) {
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
export const onDeleteCat = /* GraphQL */ `
  subscription OnDeleteCat(
    $filter: ModelSubscriptionCatFilterInput
    $owner: String
  ) {
    onDeleteCat(filter: $filter, owner: $owner) {
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
