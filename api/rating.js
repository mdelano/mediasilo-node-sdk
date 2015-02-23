'use strict'

var requestHelper         = require('./requestHelper');
var util                  = require('util');

var resourcePath = "assets/%s/ratings";
var writableFields = [ "rating" ];

module.exports = Rating;

function Rating(apiClient) {
  this.apiClient = apiClient;
}

Rating.prototype.create = function(assetId, rating) {
  return this.apiClient.post(util.format(resourcePath, assetId), requestHelper.getPayload(rating, writableFields));
}

Rating.prototype.read = function(assetId, query) {
  return this.apiClient.get(requestHelper.getRelativePath(util.format(resourcePath, assetId), null, query));
}

Rating.prototype.update = function(assetId, rating) {
  if(!assetId) {
    throw new Error("You need to provide an asset id to update metadata");
  }
  return this.apiClient.put(util.format(resourcePath, assetId), requestHelper.getPayload(rating, writableFields));
}
