'use strict'

var requestHelper         = require('./requestHelper');
var util                  = require('util');

var resourcePath = "sync/asset/%s";

module.exports = Sync;

function Sync(apiClient) {
  this.apiClient = apiClient;
}

Sync.prototype.sync = function(assetId, syncAll) {

  var path = util.format(resourcePath, assetId);

  if(syncAll == true) {
    path = path + "?syncAll=true"
  }
  
  return this.apiClient.post(util.format(resourcePath, assetId));
}
