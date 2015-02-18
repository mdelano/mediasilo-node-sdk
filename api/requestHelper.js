'use strict'

var getRelativePath = function(resourcePath, id, query) {
  var path = resourcePath;
  var path = typeof id !== 'undefined' && id != null ? path + "/" + id : path;
  var path = typeof query !== 'undefined' && query != null ? path + "?" + query : path;

  return path;
}

var getPayload = function(entity, writableFields) {
  var payload = { };

  if(entity.id) {
    payload.id = entity.id;
  }

  writableFields.forEach(function(writable_field) {
    payload[writable_field] = asset[writable_field];
  });

  return payload;
}

module.exports.getRelativePath = getRelativePath;
module.exports.getPayload = getPayload;
