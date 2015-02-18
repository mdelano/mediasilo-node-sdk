'use strict'

var requestHelper = require('./requestHelper');

var resourcePath = "projects";
var writableFields = [ "name", "description" ];

module.exports = Project;

function Project(apiClient) {
  this.apiClient = apiClient;
}

Project.prototype.create = function(project) {
  return this.apiClient.post(resourcePath, requestHelper.getPayload(project, writableFields));
}

Project.prototype.read = function(id, query) {
  return this.apiClient.get(requestHelper.getRelativePath(resourcePath, id, query));
}

Project.prototype.update = function(project) {
  if(!project.id) {
    throw new Error("You need to have and ID on your asset to perform an update.");
  }
  return this.apiClient.put(resourcePath, requestHelper.getPayload(project, writableFields));
}

Project.prototype.remove = function(id) {
  if(!id) {
    throw new Error("You need to pass and ID to delete a project.");
  }
  return this.apiClient.delete(requestHelper.getRelativePath(id));
}
