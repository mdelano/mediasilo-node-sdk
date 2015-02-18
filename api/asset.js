'use strict'

var requestHelper = require('./requestHelper');

var resourcePath = "assets";
var writableFields = [ "title", "description" ];

module.exports = Asset;

function Asset(apiClient) {
  this.apiClient = apiClient;
}

Asset.prototype.create = function(asset) {
  return this.apiClient.post(resourcePath, requestHelper.getPayload(asset, writableFields));
}

Asset.prototype.read = function(id, query) {
  return this.apiClient.get(requestHelper.getRelativePath(resourcePath, id, query));
}

Asset.prototype.update = function(asset) {
  if(!asset.id) {
    throw new Error("You need to have and ID on your asset to perform an update.");
  }
  return this.apiClient.put(resourcePath, requestHelper.getPayload(asset, writableFields));
}

Asset.prototype.remove = function(id) {
  if(!id) {
    throw new Error("You need to pass and ID to delete an asset.");
  }
  return this.apiClient.delete(requestHelper.getRelativePath(id));
}
