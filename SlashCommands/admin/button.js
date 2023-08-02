const {Client, CommandInteraction, Colors} = require('discord.js');

module.exports = {
    name: "bouton_visiteur",
    description: "Envoyer le bouton pour avoir le rôle visiteur.",
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
                    customId: "btn-visiteur",
                    style: 3,
                    label: "✅ Valider le réglement"
                }
            ]
        };

        interaction.reply({
            content: "Message envoyé.",
            ephemeral: true
        });
        interaction.channel.send({
            content: `Réagis avec le bouton ci-dessous pour avoir accès au serveur.`,
            components: [btn]
        })
    },
};