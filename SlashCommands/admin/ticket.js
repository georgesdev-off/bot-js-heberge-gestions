const {Client, CommandInteraction, Colors} = require('discord.js');

module.exports = {
    name: "panel_ticket",
    description: "Envoyer le panel ticket.",
    type: 1,
    folder: 'admin',
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) =>{
        if(!interaction.member.permissions.has("8"))return interaction.reply({content: `Vous n'avez pas la permission nécessaire !`, ephemeral: true});

        const btn = 
        {
            type: 1,
            components: [
                {
                    type: 2,
                    customId: "open_ticket",
                    style: 1,
                    label: "Créer un ticket"
                }
            ]
        };

        const embed = {
            color: Colors.DarkBlue,
            title: "SUPPORT",
            description: `Tu as besoin d'aide, tu as un problème ou une question ? Alors crées un ticket avec le bouton ci-dessous.`,
            thumbnail: {
                url: interaction.guild.iconURL({extension: "png"})
            }
        };

        interaction.reply({
            content: "Message envoyé.",
            ephemeral: true
        });
        interaction.channel.send({
            embeds: [embed],
            components: [btn]
        });
    },
};