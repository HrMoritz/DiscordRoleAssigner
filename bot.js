var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var variables = require('./variables.json');

var bot = new Discord.Client();
bot.on('ready', function (evt) {
	bot.channels.cache.get(variables.channelid).send(variables.text);
});

bot.on("message", (message) => {
if(message.content == variables.text && message.author == variables.botid){
	message.react("😀");
	message.react("🥰");
	message.react("💀");
	}
else if(message.content == "!!!info"){
	message.channel.send("This bot was made by Dalekan")
}
});

bot.on('messageReactionAdd', (reaction, user) => {
        let message = reaction.message, emoji = reaction.emoji;
		if(user.id != variables.botid && message.author == variables.botid){
        if (emoji.name == "😀") {
		reaction.message.guild.member(user).roles.add(variables.role1id);
        }

        else if (emoji.name == "🥰") {
                   reaction.message.guild.member(user).roles.add(variables.role2id);
        }

		else if (emoji.name == "💀") {
                    reaction.message.guild.member(user).roles.add(variables.role3id);
        }else{
		reaction.remove().catch(error => console.error('Failed to remove reactions: ', error));
		}}
});

bot.on('messageReactionRemove', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;
	if(user.id != variables.botid && message.author == variables.botid){
        if (emoji.name == "😀") {
                       reaction.message.guild.member(user).roles.remove(variables.role1id);
        }

        else if (emoji.name == "🥰") {
                       reaction.message.guild.member(user).roles.remove(variables.role2id);
        }

		else if (emoji.name == "💀") {
                      reaction.message.guild.member(user).roles.remove(variables.role3id);
        }}
});
bot.login(auth.token);