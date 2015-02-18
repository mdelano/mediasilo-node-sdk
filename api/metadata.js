'use strict'

var requestHelper         = require('./requestHelper');
var util                  = require('util');

var resourcePath = "assets/%s/metadata";
var writableFields = [ "key", "value" ];

module.exports = MetaData;

function MetaData(apiClient) {
  this.apiClient = apiClient;
}

MetaData.prototype.create = function(assetId, kv) {
  return this.apiClient.post(util.format(resourcePath, assetId), requestHelper.getPayload(kv, writableFields));
}

MetaData.prototype.read = function(assetId, key, query) {
  return this.apiClient.get(requestHelper.getRelativePath(util.format(resourcePath, assetId), key, query));
}

MetaData.prototype.update = function(assetId, kv) {
  if(!assetId) {
    throw new Error("You need to provide an asset id to update metadata");
  }
  return this.apiClient.put(util.format(resourcePath, assetId), requestHelper.getPayload(kv, writableFields));
}

MetaData.prototype.remove = function(assetId, key) {
  if(!id) {
    throw new Error("You need to pass and ID to delete an asset.");
  }
  return this.apiClient.delete(requestHelper.getRelativePath(util.format(resourcePath, assetId), key));
}
