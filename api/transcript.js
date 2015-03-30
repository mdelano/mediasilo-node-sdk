'use strict'

var requestHelper         = require('./requestHelper');
var util                  = require('util');

var resourcePath = "transcripts/%s";

module.exports = Transcript;

function Transcript(apiClient) {
  this.apiClient = apiClient;
}

Transcript.prototype.read = function(assetId, query) {
  return this.apiClient.get(requestHelper.getRelativePath(util.format(resourcePath, assetId), null, query));
}
