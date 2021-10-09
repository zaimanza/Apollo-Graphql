const {
    pubsub,
    withFilter,
} = require('../middleware/pubsubs');

exports.mutationSchema = `

type data_result {
    name: String,
    number: Int,
}

extend type Mutation {
    mutationExample(
        name: String!,
    ): data_result
}
`;

exports.mutationResolver = {
    Mutation: {
        mutationExample: async (root, {
            name,
        }, {
            req,
            errorName
        }) => {
            try {

                var x = 1;

                const newObj = {
                    name: name,
                    number: x,
                }

                pubsub.publish('subInt', {
                    subExample: newObj
                });

                return newObj;

            } catch (err) {
                throw err;
            }
        },
    },
};