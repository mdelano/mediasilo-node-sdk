'use strict'

var request   = require('request');
var Q         = require('q');

module.exports = client;

function client(credentials) {
    if(credentials) {
      this.credentials = credentials;
    }
    else if(process.env.username && process.env.password && process.env.hostname) {
      this.credentials = {
        username : process.env.username,
        password : process.env.password,
        hostname : process.env.hostname };
    }
    else if(config.has('mediasilo.api.credentials')) {
        this.credentials = config.get('mediasilo.api.credentials');
    }
    else {
      throw new Error("No credentials has been given. Either pass them in or specify them in the configuration file.");
    }
}

client.prototype.get = function(resource_path) {
  var deferred = Q.defer();

  request(getRequest(resource_path, this.credentials), function (error, response, body) {
    if (!error && response.statusCode < 300) {

      deferred.resolve(JSON.parse(body));
    }
    else {
      deferred.reject(getErrorResponse(response));
    }
  });

  return deferred.promise;
}

client.prototype.post = function(resource_path, payload) {
  var deferred = Q.defer();

  var options = getRequest(resource_path, this.credentials);
  options.body = JSON.stringify(payload);

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode < 300) {
      deferred.resolve(JSON.parse(body));
    }
    else {
      deferred.reject(get_error_response(response));
    }
  });

  return deferred.promise;
}

client.prototype.put = function(resource_path, payload) {
  var deferred = Q.defer();

  var options = getRequest(resource_path, this.credentials);
  options.body = JSON.stringify(payload);

  request.put(options, function (error, response, body) {
    if (!error && response.statusCode < 300) {
      if(body) {
        deferred.resolve(JSON.parse(body));
      }
      else {
        deferred.resolve();
      }
    }
    else {
      deferred.reject(get_error_response(response));
    }
  });

  return deferred.promise;
}

client.prototype.delete = function(resource_path) {
  var deferred = Q.defer();

  request(getRequest(resource_path, this.credentials), function (error, response, body) {
    if (!error && response.statusCode < 300) {
      deferred.resolve(body);
    }
    else {
      deferred.reject(get_error_response(response));
    }
  });

  return deferred.promise;
}

var getRequest = function(resource_path, credentials) {
  var request_url = getRootUrl() + resource_path;
  var encoded_credentials = new Buffer(credentials.username + ":" + credentials.password).toString('base64');

  var opts =  {
    url: request_url,
    headers: {
      'MediaSiloHostContext' : credentials.hostname,
      'Authorization' : "Basic " + encoded_credentials,
    }
  };

  if(credentials.privilegedAuth) {
    opts.headers.MediaSiloPrivilegedAuth = true;
  }

  return opts;
}

var getRootUrl = function() {
  var api_host      = typeof process.env.MEDIASILO_API_HOST !== 'undefined' ? process.env.MEDIASILO_API_HOST : 'p-api-new.mediasilo.com';
  var api_version   = typeof process.env.MEDIASILO_API_VERSION !== 'undefined' ? process.env.MEDIASILO_API_VERSION : 'v3';

  return "https://" + api_host + "/" + api_version + "/";
}

var getErrorResponse = function(res) {
  var body = "";
  var error = "HTTP " + res.statusCode;

  if(res.statusCode == 400) {
      body = "Bad request";
  }
  else if(res.statusCode == 401) {
      body = "Failed to authenticate";
  }
  else if(res.statusCode == 403) {
      body = "Unauthorized";
  }
  else if(res.statusCode == 404) {
      body = "Not found";
  }
  else if(res.statusCode == 500) {
      body = "Server Error";
  }

  return { error: error, body: body }
}
