# bert-bot
*Note*: still work in progress, some bot commands may not work yet.

This is a nodejs based app, (B)ART (E)stimated (R)eal-(T)ime bot that responds with real-time departure data
as provided by the BART api http://api.bart.gov/docs/etd/etd.aspx
(BART = Bay Area Rapid Transit system)

## Requirements
* howdy.ai botkit (https://howdy.ai)
* wit.ai app and server key (https://wit.ai)
* xml2js (https://www.npmjs.com/package/xml2js)
* util (https://www.npmjs.com/package/util)
* node-stringify (https://www.npmjs.com/package/node-stringify)
* request (https://www.npmjs.com/package/request)
* hashmap (https://www.npmjs.com/package/hashmap)

## To use for Slack:
First, create a bot (name it bert for example) in your slack group and note down the API key

To start bert-slack-bot:

```
token=<your-slack-token> wit=<your-wit-server-key> node bert-slack-bot.js
```

To test, send a direct message to the bot you created in slack
```
/msg @bert depart embarcadero
```
Or invite your bot to a channel then chat with @bert as normal
