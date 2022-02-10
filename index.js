require("dotenv").config();//Loading .env
const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

client.config = {
  prefix: process.env.PREFIX
}

//Loading Events
fs.readdir(__dirname + "/events/client/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/client/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
fs.readdir("././commands/music/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`././commands/music/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

//Logging in to discord
client.login(process.env.TOKEN)


const botconfig = require(`./botconfig.json`);
const colors = require(`./colors.json`);
const discord = require('discord.js');


client.on("ready", () => {
    setInterval(function() {
    const memberCount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
    client.user.setActivity({ name: `${memberCount.toLocaleString()} Member's`, type: "WATCHING"});
    }, 100000)
    console.log('Activaty running!');
  });
client.on('ready', () => {
    console.log(`${client.user.tag} is ready`);
});

client.on('guildMemberAdd', member => {
    
    let welcomeChannel = client.channels.cache.get("929821948739977326")
    let targetchannel = '929821986891366400' 
    if(welcomeChannel){

        let welcomeEmbed = new discord.MessageEmbed()

        if(member.user.bot){
          
            welcomeEmbed.setColor(colors.aqua)
            welcomeEmbed.setAuthor(`${member.guild.name}`)
            welcomeEmbed.setDescription(`<a:20:930103269576015942> **Hey <@${member.user.id}>** <a:20:930103269576015942> `)
            welcomeEmbed.addFields(
            {name: '<a:emoji_58:931964240963702794> **Be Server Khodet Khosh Omady** <a:emoji_58:931964240963702794> ', value: `<a:18:930103687420969001> **Ghavanin Channel Ro Dar ${member.guild.channels.cache.get(targetchannel).toString()} Bekhon** <a:18:930103687420969001>`, inline: false},
        )
            welcomeEmbed.setThumbnail(member.user.displayAvatarURL())
            welcomeEmbed.setImage("https://c.tenor.com/RpKXrOa3eOAAAAAd/welcome.gif")
            member.send(welcomeEmbed)
        }
    }else{
        console.log("Welcome Channel Yaft Nashod")
    }
})

client.login(botconfig.token);



//====================================================================================CONSTANTS REQUIRED ON READY=============================================================================================

const { PREFIX, TOKEN } = require('./config');
const bot = new Client({ disableMentions: 'everyone' });

const db = require('quick.db');
//============================================================================================================================================================================================================


//====================================================================================COLLECTIONS REQUIRED ON READY===========================================================================================
bot.commands = new Collection();
bot.aliases = new Collection();

//============================================================================================================================================================================================================



//============================================================================================INITIALIZING====================================================================================================
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

//============================================================================================================================================================================================================


//=========================================================================================MENTION SETTINGS===========================================================================================

bot.on('message', async message => {


    let prefix;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        
            } catch {
            prefix = PREFIX
    };
    try {
        if (message.mentions.has(bot.user.id) && !message.content.includes("@everyone") && !message.content.includes("@here")) {
          message.channel.send(`\nMy prefix for \`${message.guild.name}\` is \`${prefix}\` Type \`${prefix}help\` for help`);
          }
          
    } catch {
        return;
    };

});


//============================================================================================================================================================================================================
bot.login(TOKEN);


const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`http://localhost:${port}`));