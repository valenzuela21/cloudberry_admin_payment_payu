'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY_PAYU_ENV: '"4Vj8eK4rloUd272L48hsrarnUA"',
  ACCOUNT_ID_ENV: '"512326"',
  MERCHANT_ID_ENV: '"508029"'
})
