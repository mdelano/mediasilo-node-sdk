'use strict'

var Q                     = require('q');
var MediaSiloApiClient    = require('./mediasilo_api_client');
var Asset                 = require('./asset');
var MetaData              = require('./metadata');
var Rating                = require('./rating');
var Project               = require('./project');
var Folder                = require('./folder');

module.exports = MediaSiloAPI;

function MediaSiloAPI(credentials) {
  this.apiClient = new MediaSiloApiClient(credentials);
  this.Asset = new Asset(this.apiClient);
  this.MetaData = new MetaData(this.apiClient);
  this.Rating = new Rating(this.apiClient);
  this.Project = new Project(this.apiClient);
  this.Folder = new Folder(this.apiClient);
}
