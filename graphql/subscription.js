const {
    pubsub,
    withFilter,
} = require('../middleware/pubsubs');

exports.subscriptionSchema = `

extend type Subscription {
    subExample(
        name: String!,
    ): data_result
}
`;

exports.subscriptionResolver = {
    Subscription: {
        subExample: {
            resolve: (payload, args, context, info) => {
                // Manipulate and return the new value
                // console.log(context);
                return payload.subExample;
            },
            subscribe: withFilter(
                (q, qw, qwe, qwer) => {
                    // console.log(qwer);
                    return pubsub.asyncIterator('subInt');
                },
                (payload, variables) => {
                    // console.log("new load");
                    // console.log(payload.channelAdded.name);
                    // console.log(variables.name);
                    // Only push an update if the comment is on
                    // the correct repository for this operation
                    return payload.subExample.name == variables.name;
                    // return true;
                },
            ),
        },
    },
};