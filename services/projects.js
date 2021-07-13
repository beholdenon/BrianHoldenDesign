var client = require('./contentfulClient').client;

function getProjects (query) {
  query = query || {}
  query.content_type = 'project';
  query.include = 10;
  query.order = 'fields.order';
  return client.getEntries(query);
}
module.exports = {
  getProjects
}
