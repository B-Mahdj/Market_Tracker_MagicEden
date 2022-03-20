//Main entrypoint of our bot
//Call environment variables inside the .env file
require('dotenv').config();
MILLISECONDES_BEFORE_REFRESH=5000;

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
    getWalletActivities();
  }, MILLISECONDES_BEFORE_REFRESH)

});

function getWalletActivities(){
        // Call the magicEden API to get details on the angrybearclub collection (var for the name)
        var request = require('request');
        var options = {
          'method': 'GET',
          'url': 'https://api-mainnet.magiceden.dev/v2/wallets/DYFsKBpkL2RRUPfKow6yzyA3smSHN37UKXSqEbXqLd2y/activities?offset=0&limit=100',
          'headers': {
          }
        };
        request(options, function (error, response, body) {
          if(error) console.log('error', error);
          var json = JSON.parse(body);
          console.log(json);
          return json;
          //Get Floor price of the collection
        });
}

//Log our bot in using the variable 
client.login(process.env.DISCORD_BOT_TOKEN);
