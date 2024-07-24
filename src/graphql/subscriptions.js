/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCat = /* GraphQL */ `
  subscription OnCreateCat($filter: ModelSubscriptionCatFilterInput) {
    onCreateCat(filter: $filter) {
      id
      name
      breed
      age
      gender
      status
      description
      image
      requests {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCat = /* GraphQL */ `
  subscription OnUpdateCat($filter: ModelSubscriptionCatFilterInput) {
    onUpdateCat(filter: $filter) {
      id
      name
      breed
      age
      gender
      status
      description
      image
      requests {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCat = /* GraphQL */ `
  subscription OnDeleteCat($filter: ModelSubscriptionCatFilterInput) {
    onDeleteCat(filter: $filter) {
      id
      name
      breed
      age
      gender
      status
      description
      image
      requests {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest($filter: ModelSubscriptionRequestFilterInput) {
    onCreateRequest(filter: $filter) {
      id
      name
      email
      phone
      message
      status
      catID
      cat {
        id
        name
        breed
        age
        gender
        status
        description
        image
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest($filter: ModelSubscriptionRequestFilterInput) {
    onUpdateRequest(filter: $filter) {
      id
      name
      email
      phone
      message
      status
      catID
      cat {
        id
        name
        breed
        age
        gender
        status
        description
        image
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest($filter: ModelSubscriptionRequestFilterInput) {
    onDeleteRequest(filter: $filter) {
      id
      name
      email
      phone
      message
      status
      catID
      cat {
        id
        name
        breed
        age
        gender
        status
        description
        image
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
