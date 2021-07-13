if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var contentful = require('contentful');

var client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_API_TOKEN,
  space: process.env.CONTENTFUL_SPACE_ID,
  host: process.env.CONTENTFUL_HOST
})

exports.client = client;