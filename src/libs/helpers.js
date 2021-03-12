const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encyptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

helpers.matchPassword = async (password, savedPassword) => {
  return await bcrypt.compare(password, savedPassword);
}

module.exports = helpers;