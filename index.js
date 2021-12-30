// File with all neopixel stuff

/*

// Produce an animated rainbow over 25 LEDs

var ledCount = 10;
var rgb = new Uint8ClampedArray(10 * 3);
var pos = 0;

var someVar = require('./dummyFile.js')

var http = require("http");
http.get("http://www.espruino.com", function(res) {
  res.on('data', function(data) {
    console.log(data);
  });
});


function getPattern() {
  pos++;
  for (var i=0;i<rgb.length;) {
    rgb[i++] = (1 + Math.sin((i+pos)*0.1324)) * 127;
    rgb[i++] = (1 + Math.sin((i+pos)*0.1654)) * 127;
    rgb[i++] = (1 + Math.sin((i+pos)*0.1)) * 127;
  }
  return rgb;
}



setInterval(function() {
  console.log(getPattern());
  require("neopixel").write(NodeMCU.D4, getPattern());
}, 250);

*/


// Connect to Wifi :
//

    var wifi = require("Wifi");
wifi.connect("MadHouse", {password:"FerrariEnzo"}, function(err){
    console.log("connected? err=", err, "info=", wifi.getIP());
});
wifi.stopAP();

//var dummyFile = require('dummyfile');
import * as myModule from '/dummyfile.js';
console.log("theVar.someVar");
myModule.someFunc();


require("http").get("http://httptohttps.mrtimcakes.com/https://api.jsonbin.io/b/61b759e562ed886f915f555b", function(res) {
//require("http").get("http://httptohttps.mrtimcakes.com/https://jsonplaceholder.typicode.com/users", function(res) {
//require("http").get("https://jsonplaceholder.typicode.com/users", function(res) {
//require("http").get("http://pur3.co.uk/hello.txt", function(res) {
  res.on('data', function(data) {
    console.log("HTTP> "+data);
  });
  res.on('close', function(data) {
    console.log("Connection closed");
  });
});

/*
var http = require("http");
http.get("http://www.espruino.com", function (res) {
    res.on("data", function (data) {
        console.log(data);
    });
});

*/

// Make a running LED light :
var neo = require("neopixel");
let pin = NodeMCU.D4;

var arr1 = [
    120,
    120,
    120,
    0,
    0,
    0,
    255,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    255,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    255,
    0,
];

let numLed = 10;
//var arr1 = new Uint8ClampedArray(numLed * 3);

setInterval(function () {
    arr1.unshift.apply(arr1, arr1.splice(arr1.length - 3, 3));
    neo.write(pin, arr1);
}, 40);

/*
//[161, 232, 28, 111, 186, 9, 64, 125, 0, 26, 65, 3, 4, 20, 16, 1, 0, 40, 17, 11, 71, 51, 49, 108, 96, 107, 146, 146, 169, 182]



//let led = D2; // Pin for the built in LED
var toggle=1;

// Neopixel works with any pin, tried, D2, D3, D4 etc.. all works.
let pin = NodeMCU.D4;


// Note : The LED has GRB format man

setInterval(function(){
  console.log("\n\nWe Blink it");
  toggle = !toggle;
  if (toggle) {
      console.log("NeoPixel ON");
    neo.write(pin, [0,0,155,0,0,155,100,100,0]);
  } else {
        console.log("NeoPixel Off");
        neo.write(pin, [0,155,0,155,0,0,0,0,0]);
  }
  //digitalWrite(led,toggle);
}, 500);

*/
