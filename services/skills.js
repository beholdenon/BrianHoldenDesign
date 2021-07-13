var client = require('./contentfulClient').client;

function getSkills (query) {
  query = query || {}
  query.content_type = 'skills';
  query.include = 10;
  return client.getEntries(query);
}
module.exports = {
  getSkills
}
