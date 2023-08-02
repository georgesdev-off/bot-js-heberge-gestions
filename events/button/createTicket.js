const bot = require('../../index');
const {Colors} = require('discord.js');

bot.on("interactionCreate", (interaction) => {
    if(!interaction.isButton()) return;
    if(interaction.customId != "open_ticket") return;

    const cha = bot.channels.cache.get("1089534897909137501");
    cha.threads.create({
        name: `ticket-${interaction.member.user.username}`,
        autoArchiveDuration: 10080,
        type: 12
    })
    .then(channel => {
        channel.members.add(interaction.member.id);
        const roles = interaction.guild.roles.cache.get("867149357290881065");
        roles.members.forEach(e => {
            channel.members.add(e.id);
        });

        const embed = {
            color: Colors.DarkBlue,
            title: "SUPPORT",
            description: `${interaction.member.user.username} vous venez d'ouvrir un ticket. Indiquez la raison de ce ticket ci-dessous.\nIl sera pris en charge dès qu'une personne sera disponible.`
        };
        const button = {
            type: 1,
            components: [
                {
                    type: 2,
                    customId: "delete_ticket",
                    style: 4,
                    label: "Fermer le ticket"
                }
            ]
        };

        channel.send({embeds: [embed], components: [button]});
    });
});