const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile['development']);
const port = process.env.PORT || 2020;

module.exports = knex;