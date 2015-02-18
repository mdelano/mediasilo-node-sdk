'use strict'

var requestHelper         = require('./requestHelper');
var util                  = require('util');

var resourcePath = "projects/%s/folders";
var writableFields = [ "name", "parentId", "projectId" ];

module.exports = MetaData;

function MetaData(apiClient) {
  this.apiClient = apiClient;
}

MetaData.prototype.create = function(projectId, folder) {
  return this.apiClient.post(util.format(resourcePath, projectId), requestHelper.getPayload(folder, writableFields));
}

MetaData.prototype.read = function(projectId, folderId, query) {
  return this.apiClient.get(requestHelper.getRelativePath(util.format(resourcePath, projectId), folderId, query));
}

MetaData.prototype.update = function(projectId, folder) {
  if(!assetId) {
    throw new Error("You need to provide an asset id to update metadata");
  }
  return this.apiClient.put(util.format(resourcePath, projectId), requestHelper.getPayload(folder, writableFields));
}
