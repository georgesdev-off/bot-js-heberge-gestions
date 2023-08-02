const {Client, CommandInteraction, Colors} = require('discord.js');
const uniqBy = require('../../lib/UniqBy');

module.exports = {
    name: "help",
    description: "Afficher toutes les commandes du bot !",
    type: 1,
    folder: 'utilitaire',
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) =>{
        var folder_array = [];
        var folder = [];

        folder_array.push(uniqBy("folder", bot.slashCommands.toJSON()));

        for(var i = 0; i < Object.keys(folder_array[0]).length; i++){
            folder.push(folder_array[0][i]["folder"]);
        }

        const formatString = (str) => 
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = folder.map(dir => {
            const getCommands = bot.slashCommands
                .filter((cmd) => cmd.folder === dir)
                .map(cmd => {
                    return {
                        name: cmd.name || 'Pas de nom',
                        description: cmd.description || "Pas de description pour cette commande",
                    };
                });
            return {
                directory: formatString(dir),
                commands: getCommands,
            }
        });

        const embed = {
            color: Colors.DarkBlue,
            title: "Liste des commandes du bot",
            description: `Choisis une catégorie dans le menu déroulant.`,
            timestamp: new Date().toISOString()
        };

        const menuSelection = 
        {
            type: 1,
            components: [
                {
                    type: 3,
                    customId: "help-menu",
                    placeholder: "Aucune catégorie séléctionnée.",
                    options: []
                }
            ]
        };
        const a = categories.map((cmd) => {
            return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `Commandes de la catégorie ${cmd.directory}`
            }
        });
        menuSelection.components[0].options = a;

        interaction.reply({
            embeds: [embed],
            components: [menuSelection]
        });
    },
};