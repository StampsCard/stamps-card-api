module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateBusiness {
  count: Int!
}

type AggregateBusinessType {
  count: Int!
}

type AggregatePurchase {
  count: Int!
}

type AggregateStampCard {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Business {
  id: ID!
  name: String!
  category: BusinessType!
  owner: User!
  stampCards(where: StampCardWhereInput, orderBy: StampCardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StampCard!]
}

type BusinessConnection {
  pageInfo: PageInfo!
  edges: [BusinessEdge]!
  aggregate: AggregateBusiness!
}

input BusinessCreateInput {
  id: ID
  name: String!
  category: BusinessTypeCreateOneInput!
  owner: UserCreateOneWithoutBusinessesInput!
  stampCards: StampCardCreateManyWithoutBusinessInput
}

input BusinessCreateManyWithoutOwnerInput {
  create: [BusinessCreateWithoutOwnerInput!]
  connect: [BusinessWhereUniqueInput!]
}

input BusinessCreateOneWithoutStampCardsInput {
  create: BusinessCreateWithoutStampCardsInput
  connect: BusinessWhereUniqueInput
}

input BusinessCreateWithoutOwnerInput {
  id: ID
  name: String!
  category: BusinessTypeCreateOneInput!
  stampCards: StampCardCreateManyWithoutBusinessInput
}

input BusinessCreateWithoutStampCardsInput {
  id: ID
  name: String!
  category: BusinessTypeCreateOneInput!
  owner: UserCreateOneWithoutBusinessesInput!
}

type BusinessEdge {
  node: Business!
  cursor: String!
}

enum BusinessOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
}

type BusinessPreviousValues {
  id: ID!
  name: String!
}

input BusinessScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [BusinessScalarWhereInput!]
  OR: [BusinessScalarWhereInput!]
  NOT: [BusinessScalarWhereInput!]
}

type BusinessSubscriptionPayload {
  mutation: MutationType!
  node: Business
  updatedFields: [String!]
  previousValues: BusinessPreviousValues
}

input BusinessSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BusinessWhereInput
  AND: [BusinessSubscriptionWhereInput!]
  OR: [BusinessSubscriptionWhereInput!]
  NOT: [BusinessSubscriptionWhereInput!]
}

type BusinessType {
  id: ID!
  name: String!
  description: String
}

type BusinessTypeConnection {
  pageInfo: PageInfo!
  edges: [BusinessTypeEdge]!
  aggregate: AggregateBusinessType!
}

input BusinessTypeCreateInput {
  id: ID
  name: String!
  description: String
}

input BusinessTypeCreateOneInput {
  create: BusinessTypeCreateInput
  connect: BusinessTypeWhereUniqueInput
}

type BusinessTypeEdge {
  node: BusinessType!
  cursor: String!
}

enum BusinessTypeOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
}

type BusinessTypePreviousValues {
  id: ID!
  name: String!
  description: String
}

type BusinessTypeSubscriptionPayload {
  mutation: MutationType!
  node: BusinessType
  updatedFields: [String!]
  previousValues: BusinessTypePreviousValues
}

input BusinessTypeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BusinessTypeWhereInput
  AND: [BusinessTypeSubscriptionWhereInput!]
  OR: [BusinessTypeSubscriptionWhereInput!]
  NOT: [BusinessTypeSubscriptionWhereInput!]
}

input BusinessTypeUpdateDataInput {
  name: String
  description: String
}

input BusinessTypeUpdateInput {
  name: String
  description: String
}

input BusinessTypeUpdateManyMutationInput {
  name: String
  description: String
}

input BusinessTypeUpdateOneRequiredInput {
  create: BusinessTypeCreateInput
  update: BusinessTypeUpdateDataInput
  upsert: BusinessTypeUpsertNestedInput
  connect: BusinessTypeWhereUniqueInput
}

input BusinessTypeUpsertNestedInput {
  update: BusinessTypeUpdateDataInput!
  create: BusinessTypeCreateInput!
}

input BusinessTypeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [BusinessTypeWhereInput!]
  OR: [BusinessTypeWhereInput!]
  NOT: [BusinessTypeWhereInput!]
}

input BusinessTypeWhereUniqueInput {
  id: ID
  name: String
}

input BusinessUpdateInput {
  name: String
  category: BusinessTypeUpdateOneRequiredInput
  owner: UserUpdateOneRequiredWithoutBusinessesInput
  stampCards: StampCardUpdateManyWithoutBusinessInput
}

input BusinessUpdateManyDataInput {
  name: String
}

input BusinessUpdateManyMutationInput {
  name: String
}

input BusinessUpdateManyWithoutOwnerInput {
  create: [BusinessCreateWithoutOwnerInput!]
  delete: [BusinessWhereUniqueInput!]
  connect: [BusinessWhereUniqueInput!]
  set: [BusinessWhereUniqueInput!]
  disconnect: [BusinessWhereUniqueInput!]
  update: [BusinessUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [BusinessUpsertWithWhereUniqueWithoutOwnerInput!]
  deleteMany: [BusinessScalarWhereInput!]
  updateMany: [BusinessUpdateManyWithWhereNestedInput!]
}

input BusinessUpdateManyWithWhereNestedInput {
  where: BusinessScalarWhereInput!
  data: BusinessUpdateManyDataInput!
}

input BusinessUpdateOneRequiredWithoutStampCardsInput {
  create: BusinessCreateWithoutStampCardsInput
  update: BusinessUpdateWithoutStampCardsDataInput
  upsert: BusinessUpsertWithoutStampCardsInput
  connect: BusinessWhereUniqueInput
}

input BusinessUpdateWithoutOwnerDataInput {
  name: String
  category: BusinessTypeUpdateOneRequiredInput
  stampCards: StampCardUpdateManyWithoutBusinessInput
}

input BusinessUpdateWithoutStampCardsDataInput {
  name: String
  category: BusinessTypeUpdateOneRequiredInput
  owner: UserUpdateOneRequiredWithoutBusinessesInput
}

input BusinessUpdateWithWhereUniqueWithoutOwnerInput {
  where: BusinessWhereUniqueInput!
  data: BusinessUpdateWithoutOwnerDataInput!
}

input BusinessUpsertWithoutStampCardsInput {
  update: BusinessUpdateWithoutStampCardsDataInput!
  create: BusinessCreateWithoutStampCardsInput!
}

input BusinessUpsertWithWhereUniqueWithoutOwnerInput {
  where: BusinessWhereUniqueInput!
  update: BusinessUpdateWithoutOwnerDataInput!
  create: BusinessCreateWithoutOwnerInput!
}

input BusinessWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  category: BusinessTypeWhereInput
  owner: UserWhereInput
  stampCards_every: StampCardWhereInput
  stampCards_some: StampCardWhereInput
  stampCards_none: StampCardWhereInput
  AND: [BusinessWhereInput!]
  OR: [BusinessWhereInput!]
  NOT: [BusinessWhereInput!]
}

input BusinessWhereUniqueInput {
  id: ID
  name: String
}

scalar DateTime

scalar Long

type Mutation {
  createBusiness(data: BusinessCreateInput!): Business!
  updateBusiness(data: BusinessUpdateInput!, where: BusinessWhereUniqueInput!): Business
  updateManyBusinesses(data: BusinessUpdateManyMutationInput!, where: BusinessWhereInput): BatchPayload!
  upsertBusiness(where: BusinessWhereUniqueInput!, create: BusinessCreateInput!, update: BusinessUpdateInput!): Business!
  deleteBusiness(where: BusinessWhereUniqueInput!): Business
  deleteManyBusinesses(where: BusinessWhereInput): BatchPayload!
  createBusinessType(data: BusinessTypeCreateInput!): BusinessType!
  updateBusinessType(data: BusinessTypeUpdateInput!, where: BusinessTypeWhereUniqueInput!): BusinessType
  updateManyBusinessTypes(data: BusinessTypeUpdateManyMutationInput!, where: BusinessTypeWhereInput): BatchPayload!
  upsertBusinessType(where: BusinessTypeWhereUniqueInput!, create: BusinessTypeCreateInput!, update: BusinessTypeUpdateInput!): BusinessType!
  deleteBusinessType(where: BusinessTypeWhereUniqueInput!): BusinessType
  deleteManyBusinessTypes(where: BusinessTypeWhereInput): BatchPayload!
  createPurchase(data: PurchaseCreateInput!): Purchase!
  updatePurchase(data: PurchaseUpdateInput!, where: PurchaseWhereUniqueInput!): Purchase
  updateManyPurchases(data: PurchaseUpdateManyMutationInput!, where: PurchaseWhereInput): BatchPayload!
  upsertPurchase(where: PurchaseWhereUniqueInput!, create: PurchaseCreateInput!, update: PurchaseUpdateInput!): Purchase!
  deletePurchase(where: PurchaseWhereUniqueInput!): Purchase
  deleteManyPurchases(where: PurchaseWhereInput): BatchPayload!
  createStampCard(data: StampCardCreateInput!): StampCard!
  updateStampCard(data: StampCardUpdateInput!, where: StampCardWhereUniqueInput!): StampCard
  updateManyStampCards(data: StampCardUpdateManyMutationInput!, where: StampCardWhereInput): BatchPayload!
  upsertStampCard(where: StampCardWhereUniqueInput!, create: StampCardCreateInput!, update: StampCardUpdateInput!): StampCard!
  deleteStampCard(where: StampCardWhereUniqueInput!): StampCard
  deleteManyStampCards(where: StampCardWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Purchase {
  id: ID!
  amount: Float!
  stamps: Int!
  user: User
  stampCard: StampCard!
  concept: String
  confirmedAt: DateTime
  cancelledAt: DateTime
}

type PurchaseConnection {
  pageInfo: PageInfo!
  edges: [PurchaseEdge]!
  aggregate: AggregatePurchase!
}

input PurchaseCreateInput {
  id: ID
  amount: Float!
  stamps: Int!
  user: UserCreateOneWithoutPurchasesInput
  stampCard: StampCardCreateOneWithoutPurchasesInput!
  concept: String
  confirmedAt: DateTime
  cancelledAt: DateTime
}

input PurchaseCreateManyWithoutStampCardInput {
  create: [PurchaseCreateWithoutStampCardInput!]
  connect: [PurchaseWhereUniqueInput!]
}

input PurchaseCreateManyWithoutUserInput {
  create: [PurchaseCreateWithoutUserInput!]
  connect: [PurchaseWhereUniqueInput!]
}

input PurchaseCreateWithoutStampCardInput {
  id: ID
  amount: Float!
  stamps: Int!
  user: UserCreateOneWithoutPurchasesInput
  concept: String
  confirmedAt: DateTime
  cancelledAt: DateTime
}

input PurchaseCreateWithoutUserInput {
  id: ID
  amount: Float!
  stamps: Int!
  stampCard: StampCardCreateOneWithoutPurchasesInput!
  concept: String
  confirmedAt: DateTime
  cancelledAt: DateTime
}

type PurchaseEdge {
  node: Purchase!
  cursor: String!
}

enum PurchaseOrderByInput {
  id_ASC
  id_DESC
  amount_ASC
  amount_DESC
  stamps_ASC
  stamps_DESC
  concept_ASC
  concept_DESC
  confirmedAt_ASC
  confirmedAt_DESC
  cancelledAt_ASC
  cancelledAt_DESC
}

type PurchasePreviousValues {
  id: ID!
  amount: Float!
  stamps: Int!
  concept: String
  confirmedAt: DateTime
  cancelledAt: DateTime
}

input PurchaseScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  amount: Float
  amount_not: Float
  amount_in: [Float!]
  amount_not_in: [Float!]
  amount_lt: Float
  amount_lte: Float
  amount_gt: Float
  amount_gte: Float
  stamps: Int
  stamps_not: Int
  stamps_in: [Int!]
  stamps_not_in: [Int!]
  stamps_lt: Int
  stamps_lte: Int
  stamps_gt: Int
  stamps_gte: Int
  concept: String
  concept_not: String
  concept_in: [String!]
  concept_not_in: [String!]
  concept_lt: String
  concept_lte: String
  concept_gt: String
  concept_gte: String
  concept_contains: String
  concept_not_contains: String
  concept_starts_with: String
  concept_not_starts_with: String
  concept_ends_with: String
  concept_not_ends_with: String
  confirmedAt: DateTime
  confirmedAt_not: DateTime
  confirmedAt_in: [DateTime!]
  confirmedAt_not_in: [DateTime!]
  confirmedAt_lt: DateTime
  confirmedAt_lte: DateTime
  confirmedAt_gt: DateTime
  confirmedAt_gte: DateTime
  cancelledAt: DateTime
  cancelledAt_not: DateTime
  cancelledAt_in: [DateTime!]
  cancelledAt_not_in: [DateTime!]
  cancelledAt_lt: DateTime
  cancelledAt_lte: DateTime
  cancelledAt_gt: DateTime
  cancelledAt_gte: DateTime
  AND: [PurchaseScalarWhereInput!]
  OR: [PurchaseScalarWhereInput!]
  NOT: [PurchaseScalarWhereInput!]
}

type PurchaseSubscriptionPayload {
  mutation: MutationType!
  node: Purchase
  updatedFields: [String!]
  previousValues: PurchasePreviousValues
}

input PurchaseSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PurchaseWhereInput
  AND: [PurchaseSubscriptionWhereInput!]
  OR: [PurchaseSubscriptionWhereInput!]
  NOT: [PurchaseSubscriptionWhereInput!]
}

input PurchaseUpdateInput {
  amount: Float
  stamps: Int
  user: UserUpdateOneWithoutPurchasesInput
  stampCard: StampCardUpdateOneRequiredWithoutPurchasesInput
  concept: String
  confirmedAt: DateTime
  cancelledAt: DateTime
}

input PurchaseUpdateManyDataInput {
  amount: Float
  stamps: Int
  concept: String
  confirmedAt: DateTime
  cancelledAt: DateTime
}

input PurchaseUpdateManyMutationInput {
  amount: Float
  stamps: Int
  concept: String
  confirmedAt: DateTime
  cancelledAt: DateTime
}

input PurchaseUpdateManyWithoutStampCardInput {
  create: [PurchaseCreateWithoutStampCardInput!]
  delete: [PurchaseWhereUniqueInput!]
  connect: [PurchaseWhereUniqueInput!]
  set: [PurchaseWhereUniqueInput!]
  disconnect: [PurchaseWhereUniqueInput!]
  update: [PurchaseUpdateWithWhereUniqueWithoutStampCardInput!]
  upsert: [PurchaseUpsertWithWhereUniqueWithoutStampCardInput!]
  deleteMany: [PurchaseScalarWhereInput!]
  updateMany: [PurchaseUpdateManyWithWhereNestedInput!]
}

input PurchaseUpdateManyWithoutUserInput {
  create: [PurchaseCreateWithoutUserInput!]
  delete: [PurchaseWhereUniqueInput!]
  connect: [PurchaseWhereUniqueInput!]
  set: [PurchaseWhereUniqueInput!]
  disconnect: [PurchaseWhereUniqueInput!]
  update: [PurchaseUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [PurchaseUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [PurchaseScalarWhereInput!]
  updateMany: [PurchaseUpdateManyWithWhereNestedInput!]
}

input PurchaseUpdateManyWithWhereNestedInput {
  where: PurchaseScalarWhereInput!
  data: PurchaseUpdateManyDataInput!
}

input PurchaseUpdateWithoutStampCardDataInput {
  amount: Float
  stamps: Int
  user: UserUpdateOneWithoutPurchasesInput
  concept: String
  confirmedAt: DateTime
  cancelledAt: DateTime
}

input PurchaseUpdateWithoutUserDataInput {
  amount: Float
  stamps: Int
  stampCard: StampCardUpdateOneRequiredWithoutPurchasesInput
  concept: String
  confirmedAt: DateTime
  cancelledAt: DateTime
}

input PurchaseUpdateWithWhereUniqueWithoutStampCardInput {
  where: PurchaseWhereUniqueInput!
  data: PurchaseUpdateWithoutStampCardDataInput!
}

input PurchaseUpdateWithWhereUniqueWithoutUserInput {
  where: PurchaseWhereUniqueInput!
  data: PurchaseUpdateWithoutUserDataInput!
}

input PurchaseUpsertWithWhereUniqueWithoutStampCardInput {
  where: PurchaseWhereUniqueInput!
  update: PurchaseUpdateWithoutStampCardDataInput!
  create: PurchaseCreateWithoutStampCardInput!
}

input PurchaseUpsertWithWhereUniqueWithoutUserInput {
  where: PurchaseWhereUniqueInput!
  update: PurchaseUpdateWithoutUserDataInput!
  create: PurchaseCreateWithoutUserInput!
}

input PurchaseWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  amount: Float
  amount_not: Float
  amount_in: [Float!]
  amount_not_in: [Float!]
  amount_lt: Float
  amount_lte: Float
  amount_gt: Float
  amount_gte: Float
  stamps: Int
  stamps_not: Int
  stamps_in: [Int!]
  stamps_not_in: [Int!]
  stamps_lt: Int
  stamps_lte: Int
  stamps_gt: Int
  stamps_gte: Int
  user: UserWhereInput
  stampCard: StampCardWhereInput
  concept: String
  concept_not: String
  concept_in: [String!]
  concept_not_in: [String!]
  concept_lt: String
  concept_lte: String
  concept_gt: String
  concept_gte: String
  concept_contains: String
  concept_not_contains: String
  concept_starts_with: String
  concept_not_starts_with: String
  concept_ends_with: String
  concept_not_ends_with: String
  confirmedAt: DateTime
  confirmedAt_not: DateTime
  confirmedAt_in: [DateTime!]
  confirmedAt_not_in: [DateTime!]
  confirmedAt_lt: DateTime
  confirmedAt_lte: DateTime
  confirmedAt_gt: DateTime
  confirmedAt_gte: DateTime
  cancelledAt: DateTime
  cancelledAt_not: DateTime
  cancelledAt_in: [DateTime!]
  cancelledAt_not_in: [DateTime!]
  cancelledAt_lt: DateTime
  cancelledAt_lte: DateTime
  cancelledAt_gt: DateTime
  cancelledAt_gte: DateTime
  AND: [PurchaseWhereInput!]
  OR: [PurchaseWhereInput!]
  NOT: [PurchaseWhereInput!]
}

input PurchaseWhereUniqueInput {
  id: ID
}

type Query {
  business(where: BusinessWhereUniqueInput!): Business
  businesses(where: BusinessWhereInput, orderBy: BusinessOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Business]!
  businessesConnection(where: BusinessWhereInput, orderBy: BusinessOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BusinessConnection!
  businessType(where: BusinessTypeWhereUniqueInput!): BusinessType
  businessTypes(where: BusinessTypeWhereInput, orderBy: BusinessTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [BusinessType]!
  businessTypesConnection(where: BusinessTypeWhereInput, orderBy: BusinessTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BusinessTypeConnection!
  purchase(where: PurchaseWhereUniqueInput!): Purchase
  purchases(where: PurchaseWhereInput, orderBy: PurchaseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Purchase]!
  purchasesConnection(where: PurchaseWhereInput, orderBy: PurchaseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PurchaseConnection!
  stampCard(where: StampCardWhereUniqueInput!): StampCard
  stampCards(where: StampCardWhereInput, orderBy: StampCardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StampCard]!
  stampCardsConnection(where: StampCardWhereInput, orderBy: StampCardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StampCardConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type StampCard {
  id: ID!
  stamp_price: Float!
  total: Int!
  business: Business!
  purchases(where: PurchaseWhereInput, orderBy: PurchaseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Purchase!]
  discount: String!
}

type StampCardConnection {
  pageInfo: PageInfo!
  edges: [StampCardEdge]!
  aggregate: AggregateStampCard!
}

input StampCardCreateInput {
  id: ID
  stamp_price: Float!
  total: Int
  business: BusinessCreateOneWithoutStampCardsInput!
  purchases: PurchaseCreateManyWithoutStampCardInput
  discount: String!
}

input StampCardCreateManyInput {
  create: [StampCardCreateInput!]
  connect: [StampCardWhereUniqueInput!]
}

input StampCardCreateManyWithoutBusinessInput {
  create: [StampCardCreateWithoutBusinessInput!]
  connect: [StampCardWhereUniqueInput!]
}

input StampCardCreateOneWithoutPurchasesInput {
  create: StampCardCreateWithoutPurchasesInput
  connect: StampCardWhereUniqueInput
}

input StampCardCreateWithoutBusinessInput {
  id: ID
  stamp_price: Float!
  total: Int
  purchases: PurchaseCreateManyWithoutStampCardInput
  discount: String!
}

input StampCardCreateWithoutPurchasesInput {
  id: ID
  stamp_price: Float!
  total: Int
  business: BusinessCreateOneWithoutStampCardsInput!
  discount: String!
}

type StampCardEdge {
  node: StampCard!
  cursor: String!
}

enum StampCardOrderByInput {
  id_ASC
  id_DESC
  stamp_price_ASC
  stamp_price_DESC
  total_ASC
  total_DESC
  discount_ASC
  discount_DESC
}

type StampCardPreviousValues {
  id: ID!
  stamp_price: Float!
  total: Int!
  discount: String!
}

input StampCardScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  stamp_price: Float
  stamp_price_not: Float
  stamp_price_in: [Float!]
  stamp_price_not_in: [Float!]
  stamp_price_lt: Float
  stamp_price_lte: Float
  stamp_price_gt: Float
  stamp_price_gte: Float
  total: Int
  total_not: Int
  total_in: [Int!]
  total_not_in: [Int!]
  total_lt: Int
  total_lte: Int
  total_gt: Int
  total_gte: Int
  discount: String
  discount_not: String
  discount_in: [String!]
  discount_not_in: [String!]
  discount_lt: String
  discount_lte: String
  discount_gt: String
  discount_gte: String
  discount_contains: String
  discount_not_contains: String
  discount_starts_with: String
  discount_not_starts_with: String
  discount_ends_with: String
  discount_not_ends_with: String
  AND: [StampCardScalarWhereInput!]
  OR: [StampCardScalarWhereInput!]
  NOT: [StampCardScalarWhereInput!]
}

type StampCardSubscriptionPayload {
  mutation: MutationType!
  node: StampCard
  updatedFields: [String!]
  previousValues: StampCardPreviousValues
}

input StampCardSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: StampCardWhereInput
  AND: [StampCardSubscriptionWhereInput!]
  OR: [StampCardSubscriptionWhereInput!]
  NOT: [StampCardSubscriptionWhereInput!]
}

input StampCardUpdateDataInput {
  stamp_price: Float
  total: Int
  business: BusinessUpdateOneRequiredWithoutStampCardsInput
  purchases: PurchaseUpdateManyWithoutStampCardInput
  discount: String
}

input StampCardUpdateInput {
  stamp_price: Float
  total: Int
  business: BusinessUpdateOneRequiredWithoutStampCardsInput
  purchases: PurchaseUpdateManyWithoutStampCardInput
  discount: String
}

input StampCardUpdateManyDataInput {
  stamp_price: Float
  total: Int
  discount: String
}

input StampCardUpdateManyInput {
  create: [StampCardCreateInput!]
  update: [StampCardUpdateWithWhereUniqueNestedInput!]
  upsert: [StampCardUpsertWithWhereUniqueNestedInput!]
  delete: [StampCardWhereUniqueInput!]
  connect: [StampCardWhereUniqueInput!]
  set: [StampCardWhereUniqueInput!]
  disconnect: [StampCardWhereUniqueInput!]
  deleteMany: [StampCardScalarWhereInput!]
  updateMany: [StampCardUpdateManyWithWhereNestedInput!]
}

input StampCardUpdateManyMutationInput {
  stamp_price: Float
  total: Int
  discount: String
}

input StampCardUpdateManyWithoutBusinessInput {
  create: [StampCardCreateWithoutBusinessInput!]
  delete: [StampCardWhereUniqueInput!]
  connect: [StampCardWhereUniqueInput!]
  set: [StampCardWhereUniqueInput!]
  disconnect: [StampCardWhereUniqueInput!]
  update: [StampCardUpdateWithWhereUniqueWithoutBusinessInput!]
  upsert: [StampCardUpsertWithWhereUniqueWithoutBusinessInput!]
  deleteMany: [StampCardScalarWhereInput!]
  updateMany: [StampCardUpdateManyWithWhereNestedInput!]
}

input StampCardUpdateManyWithWhereNestedInput {
  where: StampCardScalarWhereInput!
  data: StampCardUpdateManyDataInput!
}

input StampCardUpdateOneRequiredWithoutPurchasesInput {
  create: StampCardCreateWithoutPurchasesInput
  update: StampCardUpdateWithoutPurchasesDataInput
  upsert: StampCardUpsertWithoutPurchasesInput
  connect: StampCardWhereUniqueInput
}

input StampCardUpdateWithoutBusinessDataInput {
  stamp_price: Float
  total: Int
  purchases: PurchaseUpdateManyWithoutStampCardInput
  discount: String
}

input StampCardUpdateWithoutPurchasesDataInput {
  stamp_price: Float
  total: Int
  business: BusinessUpdateOneRequiredWithoutStampCardsInput
  discount: String
}

input StampCardUpdateWithWhereUniqueNestedInput {
  where: StampCardWhereUniqueInput!
  data: StampCardUpdateDataInput!
}

input StampCardUpdateWithWhereUniqueWithoutBusinessInput {
  where: StampCardWhereUniqueInput!
  data: StampCardUpdateWithoutBusinessDataInput!
}

input StampCardUpsertWithoutPurchasesInput {
  update: StampCardUpdateWithoutPurchasesDataInput!
  create: StampCardCreateWithoutPurchasesInput!
}

input StampCardUpsertWithWhereUniqueNestedInput {
  where: StampCardWhereUniqueInput!
  update: StampCardUpdateDataInput!
  create: StampCardCreateInput!
}

input StampCardUpsertWithWhereUniqueWithoutBusinessInput {
  where: StampCardWhereUniqueInput!
  update: StampCardUpdateWithoutBusinessDataInput!
  create: StampCardCreateWithoutBusinessInput!
}

input StampCardWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  stamp_price: Float
  stamp_price_not: Float
  stamp_price_in: [Float!]
  stamp_price_not_in: [Float!]
  stamp_price_lt: Float
  stamp_price_lte: Float
  stamp_price_gt: Float
  stamp_price_gte: Float
  total: Int
  total_not: Int
  total_in: [Int!]
  total_not_in: [Int!]
  total_lt: Int
  total_lte: Int
  total_gt: Int
  total_gte: Int
  business: BusinessWhereInput
  purchases_every: PurchaseWhereInput
  purchases_some: PurchaseWhereInput
  purchases_none: PurchaseWhereInput
  discount: String
  discount_not: String
  discount_in: [String!]
  discount_not_in: [String!]
  discount_lt: String
  discount_lte: String
  discount_gt: String
  discount_gte: String
  discount_contains: String
  discount_not_contains: String
  discount_starts_with: String
  discount_not_starts_with: String
  discount_ends_with: String
  discount_not_ends_with: String
  AND: [StampCardWhereInput!]
  OR: [StampCardWhereInput!]
  NOT: [StampCardWhereInput!]
}

input StampCardWhereUniqueInput {
  id: ID
}

type Subscription {
  business(where: BusinessSubscriptionWhereInput): BusinessSubscriptionPayload
  businessType(where: BusinessTypeSubscriptionWhereInput): BusinessTypeSubscriptionPayload
  purchase(where: PurchaseSubscriptionWhereInput): PurchaseSubscriptionPayload
  stampCard(where: StampCardSubscriptionWhereInput): StampCardSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  firstName: String
  lastName: String
  fbToken: String
  igToken: String
  purchases(where: PurchaseWhereInput, orderBy: PurchaseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Purchase!]
  businesses(where: BusinessWhereInput, orderBy: BusinessOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Business!]
  stampCards(where: StampCardWhereInput, orderBy: StampCardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StampCard!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  username: String!
  email: String!
  password: String!
  firstName: String
  lastName: String
  fbToken: String
  igToken: String
  purchases: PurchaseCreateManyWithoutUserInput
  businesses: BusinessCreateManyWithoutOwnerInput
  stampCards: StampCardCreateManyInput
}

input UserCreateOneWithoutBusinessesInput {
  create: UserCreateWithoutBusinessesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPurchasesInput {
  create: UserCreateWithoutPurchasesInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutBusinessesInput {
  id: ID
  username: String!
  email: String!
  password: String!
  firstName: String
  lastName: String
  fbToken: String
  igToken: String
  purchases: PurchaseCreateManyWithoutUserInput
  stampCards: StampCardCreateManyInput
}

input UserCreateWithoutPurchasesInput {
  id: ID
  username: String!
  email: String!
  password: String!
  firstName: String
  lastName: String
  fbToken: String
  igToken: String
  businesses: BusinessCreateManyWithoutOwnerInput
  stampCards: StampCardCreateManyInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  fbToken_ASC
  fbToken_DESC
  igToken_ASC
  igToken_DESC
}

type UserPreviousValues {
  id: ID!
  username: String!
  email: String!
  password: String!
  firstName: String
  lastName: String
  fbToken: String
  igToken: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  username: String
  email: String
  password: String
  firstName: String
  lastName: String
  fbToken: String
  igToken: String
  purchases: PurchaseUpdateManyWithoutUserInput
  businesses: BusinessUpdateManyWithoutOwnerInput
  stampCards: StampCardUpdateManyInput
}

input UserUpdateManyMutationInput {
  username: String
  email: String
  password: String
  firstName: String
  lastName: String
  fbToken: String
  igToken: String
}

input UserUpdateOneRequiredWithoutBusinessesInput {
  create: UserCreateWithoutBusinessesInput
  update: UserUpdateWithoutBusinessesDataInput
  upsert: UserUpsertWithoutBusinessesInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutPurchasesInput {
  create: UserCreateWithoutPurchasesInput
  update: UserUpdateWithoutPurchasesDataInput
  upsert: UserUpsertWithoutPurchasesInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutBusinessesDataInput {
  username: String
  email: String
  password: String
  firstName: String
  lastName: String
  fbToken: String
  igToken: String
  purchases: PurchaseUpdateManyWithoutUserInput
  stampCards: StampCardUpdateManyInput
}

input UserUpdateWithoutPurchasesDataInput {
  username: String
  email: String
  password: String
  firstName: String
  lastName: String
  fbToken: String
  igToken: String
  businesses: BusinessUpdateManyWithoutOwnerInput
  stampCards: StampCardUpdateManyInput
}

input UserUpsertWithoutBusinessesInput {
  update: UserUpdateWithoutBusinessesDataInput!
  create: UserCreateWithoutBusinessesInput!
}

input UserUpsertWithoutPurchasesInput {
  update: UserUpdateWithoutPurchasesDataInput!
  create: UserCreateWithoutPurchasesInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  fbToken: String
  fbToken_not: String
  fbToken_in: [String!]
  fbToken_not_in: [String!]
  fbToken_lt: String
  fbToken_lte: String
  fbToken_gt: String
  fbToken_gte: String
  fbToken_contains: String
  fbToken_not_contains: String
  fbToken_starts_with: String
  fbToken_not_starts_with: String
  fbToken_ends_with: String
  fbToken_not_ends_with: String
  igToken: String
  igToken_not: String
  igToken_in: [String!]
  igToken_not_in: [String!]
  igToken_lt: String
  igToken_lte: String
  igToken_gt: String
  igToken_gte: String
  igToken_contains: String
  igToken_not_contains: String
  igToken_starts_with: String
  igToken_not_starts_with: String
  igToken_ends_with: String
  igToken_not_ends_with: String
  purchases_every: PurchaseWhereInput
  purchases_some: PurchaseWhereInput
  purchases_none: PurchaseWhereInput
  businesses_every: BusinessWhereInput
  businesses_some: BusinessWhereInput
  businesses_none: BusinessWhereInput
  stampCards_every: StampCardWhereInput
  stampCards_some: StampCardWhereInput
  stampCards_none: StampCardWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
  email: String
}
`
      }
    