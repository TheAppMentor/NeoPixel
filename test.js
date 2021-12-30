// Connect to Wifi 

var wifi = require("Wifi");
wifi.connect("MadHouse", {password:"FerrariEnzo"}, function(err){
    console.log("connected? err=", err, "info=", wifi.getIP());
});

wifi.save();
wifi.stopAP();

let jsonURL = "http://httptohttps.mrtimcakes.com/https://api.jsonbin.io/b/61b8daf662ed886f91606c3a/1";

var options = {
    host: 'httptohttps.mrtimcakes.com', // host name
    port: 80,            // (optional) port, defaults to 80
    path: '/https://api.npoint.io/6c4834871c04e3e06df0',           // path sent to server
    method: 'GET',       // HTTP command sent to server (must be uppercase 'GET', 'POST', etc)
    protocol: 'http:',   // optional protocol - https: or http:
    headers: { "secret-key" : "$2b$10$Z.irW6uMZh0IRN1O/qWM4enGO0r8sANwqbSuYmZYh7faMNaqAZSxG" } // (optional) HTTP headers
  };

setInterval(function() {
var req = require("http").request(options, function(res) {
  res.on('data', function(data) {
    //console.log("HTTP> "+data);
    const resp = JSON.parse(data);
    console.log("resp is : ",resp);
    console.log(resp.color);
    let color = resp.color;
     require("neopixel").write(NodeMCU.D4, [255,0,0]);
  });
  res.on('close', function(data) {
    console.log("Connection closed");
  });
});
// You can req.write(...) here if your request requires data to be sent.
req.end(); // called to finish the HTTP request and get the response
},3000);
  
/*
setInterval(function() {
require("http").get(jsonURL, function(res) {
  res.on('data', function(data) {
    console.log("HTTP> "+data);
    require("neopixel").write(NodeMCU.D4, [255,0,0]);
  });
  res.on('close', function(data) {
    console.log("Connection closed");
  });
});
},3000);

*/

/*


// File with all neopixel stuff

var rgb = new Uint8ClampedArray(3);
var pos = 0;

var brightness = 255;   // 0-255

function getPattern() {
  pos++;
  for (var i=0;i<rgb.length;) {
    rgb[i++] = (1 + Math.sin((i+pos)*0.1324)) * brightness;
    rgb[i++] = (1 + Math.sin((i+pos)*0.1654)) * brightness;
    rgb[i++] = (1 + Math.sin((i+pos)*0.1)) * brightness;
  }
  return rgb;
}

var toggle = 1;
setInterval(function() {
  toggle = !toggle;
  //console.log("Blink : " + toggle);

  require("neopixel").write(NodeMCU.D4, getPattern());
  return;
  
  if (toggle) {
    require("neopixel").write(NodeMCU.D4, [255,0,0]);
    return;
  }
  require("neopixel").write(NodeMCU.D4, [0,255,0]);
}, 30);

*/