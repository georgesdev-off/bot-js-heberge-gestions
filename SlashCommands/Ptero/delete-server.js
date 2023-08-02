const { Colors, Client, CommandInteraction } = require("discord.js");
const fetch = require('request');

module.exports = {
    name: "delete_server",
    description: "Supprimer ton serveur NAME-HEBERGEUR",
    folder: 'serveur',
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    type: 1,
    run: async (bot, interaction, args) =>{
        await interaction.deferReply({ephemeral: true});
        let i = 1, l = 1;
        let array = [], option = [];
        list(i);

        function listServer(number, id){
            fetch({
                url: `URL-DU-PANEL/api/application/servers?page=${number}`,
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer #API_KEY#",
                }
            }, async (e, res, body) => {
                const r = JSON.parse(body);
                r.data.forEach((e) => {
                    if(e.attributes.user == id.attributes.id){
                        array.push(e.attributes);
                    }
                });
                if(!array) return interaction.editReply({content: "Vous n'avez pas de serveur."});

                if(l == r.meta.pagination.total_pages){
                    const selectMenu = {
                        type: 1,
                        components: [
                            {
                                type: 3,
                                customId: "delete-server",
                                placeholder: "Sélectionner un serveur.",
                                options: array.map(server => ({label: server.name, value: String(server.id)}))
                            }
                        ]
                    };

                    interaction.editReply({components: [selectMenu]});
                }
                else {
                    l++;
                    listServer(l, id);
                }
            })
        }
        function list(number){
            fetch({
                url: `URL-DU-PANEL/api/application/users?page=${number}`,
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer #API_KEY#",
                }
            }, (e, res, body) => {
                const r = JSON.parse(body);
                let id = r.data.find(e => e.attributes.email == `${interaction.user.id}@NAME-HEBERGEUR`);
                if(!id){
                    if(i == r.meta.pagination.total_pages) return interaction.editReply({content: "Vous n'avez pas de compte."});
                    i++;
                    list(i);
                }
                if(id){
                    listServer(l, id);
                }
            });
        }
    }
};