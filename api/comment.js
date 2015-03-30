'use strict'

var requestHelper         = require('./requestHelper');
var util                  = require('util');

var resourcePath = "assets/%s/comments";
var writableFields = [ "at", "inResponseTo", "context", "startTimeCode", "endTimeCode", "body" ];

module.exports = Comment;

function Comment(apiClient) {
  this.apiClient = apiClient;
}

Comment.prototype.create = function(assetId, comment) {
  return this.apiClient.post(util.format(resourcePath, assetId), requestHelper.getPayload(comment, writableFields));
}

Comment.prototype.read = function(assetId, query) {
  return this.apiClient.get(requestHelper.getRelativePath(util.format(resourcePath, assetId), null, query));
}

Comment.prototype.update = function(assetId, comment) {
  if(!assetId) {
    throw new Error("You need to provide an asset id to update metadata");
  }
  return this.apiClient.put(util.format(resourcePath, assetId), requestHelper.getPayload(comment, writableFields));
}
