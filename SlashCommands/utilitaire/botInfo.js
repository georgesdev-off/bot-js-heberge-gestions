const {Client, CommandInteraction, Colors} = require('discord.js');
const package = require("../../package.json");

module.exports = {
    name: "botinfo",
    description: "Informations du bot.",
    type: 1,
    folder: 'utilitaire',
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) =>{
        let uptime = {
            days: Math.floor((bot.uptime / 1e3) / 8.64e4),
            hours: Math.floor(((bot.uptime / 1e3) % 8.64e4) / 3.6e3),
            minutes: Math.floor((((bot.uptime / 1e3)% 8.64e4) % 3.6e3) / 60),
            seconds: Math.floor((((bot.uptime / 1e3)% 8.64e4) % 3.6e3) % 60)
        }
        const embed = {
            color: Colors.DarkBlue,
            title: "INFORMATIONS DU BOT",
            fields: [
                {
                    "name": "Ping du Bot vers discord.js",
                    "value": `${bot.ws.ping}ms`,
                    "inline": true
                },
                {
                    "name": "Uptime",
                    "value": `${uptime.days} jours, ${uptime.hours} heures, ${uptime.minutes} minutes, ${uptime.seconds} secondes.`,
                    "inline": true
                },
                {
                    "name": "Version de node.js",
                    "value": `${process.version}`,
                    "inline": true
                },
                {
                    "name": "Version du Bot",
                    "value": `${package.version}`,
                    "inline": true
                }
            ],
            thumbnail: {
                url: "URL-DE-LA-PHOTO-DE-PROFIL-DU-BOT"
            },
            timestamp: new Date().toISOString()
        };

        await interaction.reply({embeds: [embed],ephemeral: true});
    },
};