//get slack token
if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

//get wit.ai token
if (!process.env.wit) {
    console.log('Error: Specify wit in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');

var wit = require('./lib/botkit-middleware-witai.js')({
    token: process.env.wit
});

var parseXml = require('xml2js').parseString;
var util = require('util');
var stringify = require('node-stringify');
var request = require('request');

var stationService = require('./service/station.js');

var controller = Botkit.slackbot({
    debug: false,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

var basicHandlers = 'direct_message, direct_mention, mention';

var activity;
var station;

//call wit.ai to get intent
var witToken = 'Bearer ' + process.env.wit;

//catches anything, call wit.ai to get intent
controller.hears(['(.*)'],basicHandlers,function(bot,message) {
  //console.log(message.match[1]); //to get the entire message typed

  //show bert is typing...
  bot.reply(message,{
    type: 'typing'
  });

  request({
    url: 'https://api.wit.ai/message',
    method: 'GET',
    qs: { 'q' : message.match[1]
    },
    headers: {
      'Authorization': witToken
    }
  }, function(error, response, body) {
    if (response.statusCode == 200) {
        console.log("response body="+body);
        obj = JSON.parse(body);

        activity = obj.entities.activity[0].value;
        station = obj.entities.station[0].value;
        stationAbbr = stationService.getAbbr(station.toLowerCase());

        console.log('station='+station);
        console.log('stationAbbr='+stationAbbr);

        var url = 'http://api.bart.gov/api/etd.aspx';
        var paramObj = {cmd: 'etd', orig: stationAbbr, key: 'MW9S-E7SL-26DU-VV8V'}; //key is public, you can get a private key if you want to

        var replyText = 'Here are the next departures from ';

        //sample REST GET (XML response) - note key is a public key
        if (stationAbbr == undefined) {
          bot.reply(message,{
            text: 'Sorry, unable to get BART data for station='+station,
            attachments: [{
            }]
          });
        } else {
          request.get({url: url, qs: paramObj}, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  parseXml(body, function (err, result) {

                  obj = JSON.parse(JSON.stringify(result));
                  console.log('bart call result='+JSON.stringify(result));
                  replyText += '*'+obj.root.station[0].name + '*\n';
                  replyText += '*Current Time:* '+obj.root.time;
                });

                obj.root.station[0].etd.forEach(function(element, index, array){
                  replyText += '\n*Destination:* '+element.destination;
                  replyText += ' | *Leaving in:* ';
                  element.estimate.forEach(function(element, index, array){
                    if (element.minutes == 'Leaving') {
                      element.minutes = 0;
                    }
                    replyText += '`'+element.minutes+'`';
                    if (index < array.length-1) {
                      replyText += ', ';
                    }
                  });
                  replyText += ' mins';
                });

                bot.reply(message,{
                  text: replyText,
                  attachments: [{
                  }]
                });
              }
          });
        }
    } else { //error getting bart etd
      bot.reply(message,{
        text: 'Sorry, unable to get BART data at this time',
        attachments: [{
        }]
      });
    }
  });
});
