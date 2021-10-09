const {
    gql,
} = require('apollo-server-express');

const {
    merge,
} = require('lodash');

const {
    makeExecutableSchema
} = require('@graphql-tools/schema');

const {
    querySchema,
    queryResolver,
} = require('./query');

const {
    mutationSchema,
    mutationResolver,
} = require('./mutation');

const {
    subscriptionSchema,
    subscriptionResolver,
} = require('./subscription');

const typeDefs = gql`
type Query {
   _empty: String 
}

type Mutation {
    _empty: String 
} 

type Subscription {
    _empty: String 
} 
 
 ${querySchema}
 ${mutationSchema}
 ${subscriptionSchema}
`;

const resolvers = merge({}, queryResolver, mutationResolver, subscriptionResolver);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

exports.schema = schema;