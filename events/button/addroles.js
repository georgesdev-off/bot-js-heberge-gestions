const bot = require("../../index");

bot.on('interactionCreate', (interaction) => {
    if(!interaction.isButton()) return;
    if(interaction.customId != "btn-visiteur") return;

    interaction.member.roles.add("ID-ROLE-MEMBRES-OU-CLIENTS");
    interaction.reply({content: "Vous avez maintenant accès au serveur.", ephemeral: true});
});