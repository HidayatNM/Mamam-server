const bcryptjs = require("bcryptjs");

const hashPassword = (password) => bcryptjs.hashSync(password);

const comparePass = (password, hashPassword) =>
  bcryptjs.compareSync(password, hashPassword);

module.exports = { hashPassword, comparePass };
