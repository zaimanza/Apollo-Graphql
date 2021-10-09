exports.querySchema = `

extend type Query {
    queryExample: Int
}
`;

exports.queryResolver = {
    Query: {
        queryExample: async (root, {
            name,
        }, {
            req,
            errorName
        }) => {
            try {
                throw new Error(errorName.UNAUTHORIZED);

                var x = 1;
                var y = 2;

                return x + y;

            } catch (err) {
                throw err;
            }
        },
    },
};