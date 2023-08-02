const bot = require('../../index');
const fetch = require('request');
const {Colors} = require('discord.js');

bot.on("interactionCreate", async interaction => {
    if(!interaction.isSelectMenu()) return;
    if(interaction.customId != "delete-server") return;
    await interaction.deferReply({ephemeral: true});

    fetch({
        url: `URL-DU-PANEL/api/application/servers/${interaction.values[0]}`,
        "method": "DELETE",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer ptla_6GgPzdoyTIjsLtZuSLLbzCNbwoMcvaHGKTkTphejHbT",
        }
    }, async (e, res, body) => {
        if(!body.errors){
            const embed = {
                title: "Votre serveur a bien été supprimé",
                color: Colors.Red
            };
            interaction.editReply({embeds: [embed], ephemeral: true});
        } else {
            interaction.editReply({content: "Erreur lors de la suppression de votre serveur.", ephemeral: true});
            console.log(body.errors);
        }
    })
});