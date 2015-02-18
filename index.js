var mediasilo = require('./api');
var MediaSiloAPI = new mediasilo({username:"simon", password:"simon", hostname:"simon"});

MediaSiloAPI.Project.read().then(function(assets) {
  console.log("ASSET:", assets);
}).fail(function(err) {
  console.log("Error:", err);
});
