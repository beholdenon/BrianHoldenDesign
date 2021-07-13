var client = require('./contentfulClient').client;

function getLandingPage (query) {
  query = query || {}
  query.content_type = 'landingPage';
  query.include = 10;
  query.limit = 1;
  return client.getEntries(query);
}
module.exports = {
  getLandingPage
}
