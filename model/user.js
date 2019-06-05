const userSchema = require('../schema/user');

const {model} = require('../schema/config');

let User = model('users',userSchema);

module.exports = User;