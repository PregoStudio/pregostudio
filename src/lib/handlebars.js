const {format} = require('timeago.js');
//const timeagoInstance = timeago();

const helpers = {};

helpers.timeago = (timestamp) => {
    console.log(timestamp);
    return format(timestamp);
};

module.exports = helpers;