import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    groupDelete(groupId: ID!): GroupMutationPayload
    groupPublish(groupId: ID!): GroupMutationPayload
    groupUnpublish(groupId: ID!): GroupMutationPayload
    groupAddCars(groupId: ID!, carId: ID!): GroupMutationPayload
    groupRemoveCars(groupId: ID!, carId: ID!): GroupMutationPayload
    groupCreate(groupInput: GroupInput!): GroupMutationPayload
    groupUpdate(groupId: ID!, groupInput: GroupInput!): GroupMutationPayload
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    featureSet: GroupFeatureSet
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    image: Image!
    description: String!
  }

  type GroupFeatureSet {
    features: [GroupFeature!]!
    applyFeaturesSeparately: Boolean!
  }

  type GroupFeature {
    feature: GroupFeatureField!
  }

  type Image {
    id: ID!
    url: String!
  }

  type UserError {
    message: String!
    field: [String!]!
  }

  type GroupMutationPayload {
    userErrors: [UserError!]!
    group: Group
  }

  input ImageInput {
    url: String!
  }

  input GroupInput {
    name: String
    image: ImageInput
    description: String
    featureSet: [GroupFeatureField!]
  }

  enum GroupFeatureField {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }]
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
