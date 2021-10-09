const FormatError = require("easygraphql-format-error");

exports.formatError = new FormatError([{
    name: 'UNAUTHORIZED',
    message: 'Unauthorized.',
    statusCode: '400'
}, {
    name: 'CANNOT_UPDATE_EMPTY',
    message: 'Cannot update empty.',
    statusCode: '400'
},]);