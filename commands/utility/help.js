var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
config: {
    name: "help",
    description: "Help Menu",
    usage: "1) m/help \n2) m/help [module name]\n3) m/help [command (name or alias)]",
    example: "1) m/help\n2) m/help utility\n3) m/help ban",
    aliases: ['h']
},
run: async (bot, message, args) => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };


if(message.content.toLowerCase() === `${prefix}help`){
    var log = new Discord.MessageEmbed()
    .setTitle("**<a:777552989266640897:940523915527208991> Silver Help Menu <a:777552989266640897:940523915527208991> **")
    .setColor(`#00eaff`)
         .setThumbnail(bot.user.displayAvatarURL())
    .addField(` **👑 Moderation **`, ` <a:Arrowr:941306605780230264>    \`${prefix}help mod\` `, false)
   
    .addField(` **⚙️ Utility **`, ` <a:Arrowr:941306605780230264>    \`${prefix}help unility\` `, true)
.addField(` **🎧 Music **`, ` <a:Arrowr:941306605780230264>    \`${prefix}Music\` `, false)
 .addField(` **🔧 Prefix **`, ` <a:Arrowr:941306605780230264>    \`${prefix}prefix\` `, true)
.addField(` **💝 Invaite Bot **`, ` <a:Arrowr:941306605780230264>    \`${prefix}inv\` `, false)

message.channel.send(log);
} 
else if(args[0].toLowerCase() === "mod") {
    var commandArray = ` 1.\ ${prefix}Ban\ \n 2.\ ${prefix}kick\ \n 3.\ ${prefix}user\  \n 4.\ ${prefix}Unban\  \n 5.\ ${prefix}Warn \ \n 6.\ ${prefix}Mute\  \n 7.\ ${prefix}Purge\ \n 8.\ ${prefix}Slowmode\  \n 9.\ ${prefix}Nick\ \n 10.\ ${prefix}Roleinfo\ `
    var commandA2 = ` 11.\ ${prefix}Rolememberinfo\ \n 12.\ ${prefix}Lock (Lock the channel)\ \n 13.\ ${prefix}Unlock (Unlock the channel)\ \n 14.\ ${prefix}Lockdown (Fully Lock the whole server. [FOR EMRGENCIES ONLY])\ \n 15.\ ${prefix}Hackban/forceban <id>\ \n 16.\ ${prefix}setmodlogchannel\ \n 15.\ ${prefix}disablemodlogchannel\ `
    
    pageN1 = "**\n <a:777552989266640897:940523915527208991> Bot Commands <a:777552989266640897:940523915527208991> **\n`\`\`js\n" + commandArray + "\`\`\`";
    pageN2 = "**\n <a:777552989266640897:940523915527208991> Bot Commands <a:777552989266640897:940523915527208991> **\n`\`\`js\n" + commandA2 + "\`\`\`";
    
    let pages = [pageN1, pageN2]
    let page = 1 

    var embed = new Discord.MessageEmbed()
    
        .setTitle('**👑 Moderation Menu 👑**')
        .setColor("#00eaff") // Set the color
        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
         .setThumbnail(bot.user.displayAvatarURL())
        .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
        .setDescription(pages[page-1])

        message.channel.send({embed}).then(msg => {
            msg.react('⬅').then( r => {
            msg.react('➡')
            
            // Filters
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id
            
            const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000})
            const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000})
            
            backwards.on('collect', (r, u) => {
                if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                page--
                embed.setDescription(pages[page-1])
                embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                msg.edit(embed)
                r.users.remove(r.users.cache.filter(u => u === message.author).first())
            })
            
            forwards.on('collect', (r, u) => {
                if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                page++
                embed.setDescription(pages[page-1])
                embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                msg.edit(embed)
                r.users.remove(r.users.cache.filter(u => u === message.author).first())
            })
            
            
            })
            })
}

else if(args[0].toLowerCase() === "util") {
    var embed = new Discord.MessageEmbed()
    .setTitle('**Help Menu: [Utility]**')
    .setColor("#00eaff") // Set the color
    .setDescription(`1) Prefix [${prefix}help prefix for more info]\n2) Help [${prefix}help for more info]`)
}

else {
    const embed = new Discord.MessageEmbed()
    .setColor("#00eaff")
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
    .setThumbnail(bot.user.displayAvatarURL())

    let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
    if (!command) return message.channel.send(embed.setTitle("<a:777552989266640897:940523915527208991> Bot Commands <a:777552989266640897:940523915527208991>")
    
    .setDescription( `\n <a:MOON:941305165699498014> **1.\ ${prefix}dm** [Member_id]\  \n<a:MOON:941305165699498014> **2.\ ${prefix}roleadd**\  \n<a:MOON:941305165699498014> **3.\ ${prefix}roledel**\  \n<a:MOON:941305165699498014> **4.\ ${prefix}setmuterole**\  \n<a:MOON:941305165699498014> **5.\ ${prefix}disablemuterole**\  \n<a:MOON:941305165699498014> **6.\ ${prefix}voicemove**\  \n<a:MOON:941305165699498014> **7.\ ${prefix}user**\  \n<a:MOON:941305165699498014> **8.\ ${prefix}setxp**\  \n<a:MOON:941305165699498014> **9.\ ${prefix}disablexp**\ `))
    
    command = command.config

    embed.setDescription(stripIndents`
    ** Command -** [    \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`   ]\n
    ** Description -** [    \`${command.description || "No Description provided."}\`   ]\n
    ** Usage -** [   \`${command.usage ? `\`${command.usage}\`` : "No Usage"}\`   ]\n
    ** Examples -** [   \`${command.example ? `\`${command.example}\`` : "No Examples Found"}\`   ]\n
    ** Aliases -** [   \`${command.aliases ? command.aliases.join(" , ") : "None."}\`   ]`)
    embed.setFooter(message.guild.name, message.guild.iconURL())

    return message.channel.send(embed)
}

    

}

}

