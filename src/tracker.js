//Main entrypoint of our bot
//Call environment variables inside the .env file
require('dotenv').config();
MILLISECONDES_BEFORE_REFRESH=1000;

//print dans la console la variable nommée dans .env 
//console.log(process.env.DISCORD_BOT_TOKEN);

//Import the Client class from the library 
const Discord = require('discord.js');
const { cp } = require('fs');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.on('ready', async () => {
  const GUILD_ID = client.guilds.cache.map(guild => guild.id);
  const guild = await client.guilds.fetch(GUILD_ID[0]);
  const https = require('https');
  console.log('Bot is connected...');

  setInterval(async function(){
    // Call the magicEden API to get details on the angrybearclub collection (var for the name)
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'http://api-mainnet.magiceden.dev/v2/collections/astrals/stats',
      'headers': {
      }
    };
    request(options, function (error, response, body) {
      if(error) console.log('error', err);
      var json = JSON.parse(body);
      console.log(json);
      //Get Floor price of the collection
    });
  }, MILLISECONDES_BEFORE_REFRESH)

});

function floatParse2(x) {
  return Number.parseFloat(x).toFixed(2);
}

function getWalletActivities(){
    setInterval(async function(){
        // Call the magicEden API to get details on the angrybearclub collection (var for the name)
        var request = require('request');
        var options = {
          'method': 'GET',
          'url': 'api-mainnet.magiceden.dev/v2/wallets/:wallet_address/activities?offset=0&limit=100',
          'headers': {
          }
        };
        request(options, function (error, response, body) {
          if(error) console.log('error', err);
          var json = JSON.parse(body);
          console.log(json);
          //Get Floor price of the collection
        });
      }, MILLISECONDES_BEFORE_REFRESH)
}

//Log our bot in using the variable 
client.login(process.env.DISCORD_BOT_TOKEN);
