const bot = require('../../index');
const uniqBy = require('../../lib/UniqBy/');
const {EmbedBuilder, Colors} = require("discord.js");

bot.on("interactionCreate", interaction => {
    if(!interaction.isSelectMenu()) return;
    if(interaction.customId != "help-menu") return;

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
                    new: cmd.new || ""
                };
            });
        return {
            directory: formatString(dir),
            commands: getCommands,
        }
    });

    const [ directory ] = interaction.values;

    const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
    );

    const categoryEmbed = new EmbedBuilder()
    .setColor(Colors.DarkBlue)
    .setTitle(`Catégorie ${directory}`)
    .setDescription("Voici la liste des commandes")
    .addFields(
        category.commands.map((cmd) => {
            return {
                name: `\`/${cmd.name}\` ${cmd.new}`,
                value: cmd.description,
                inline: true,
            }
        })
    );

    interaction.update({embeds: [categoryEmbed]});
})