const bot = require('../../index');
const {Colors} = require('discord.js');

bot.on("interactionCreate", (interaction) => {
    if(!interaction.isButton()) return;
    if(interaction.customId != "delete_ticket") return;

    const embed = {
        color: Colors.DarkBlue,
        title: "SUPPORT",
        description: `${interaction.member.user.username} vient de fermer le ticket ${interaction.channel.name}.`
    }
    const channels = interaction.guild.channels.cache.get("ID-SALON-LOG-ticket");
    channels.send({embeds: [embed]});

    interaction.channel.delete();
});