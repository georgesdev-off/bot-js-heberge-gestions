const { Colors } = require("discord.js");
const fetch = require('request');

module.exports = {
    name: "create_user",
    description: "Créé ton compte sur NAME-HEBERGEUR.",
    folder: 'serveur',
    /**
     *
     * @param {discord.Client} bot
     * @param {discord.CommandInteraction} interaction
     * @param {String[]} args
     */
     type: 1,
     run: async (bot, interaction, args) =>{
        await interaction.deferReply({ephemeral: true});
        const password = new Array(12).fill().map(() => String.fromCharCode(Math.random()*86+40)).join("");

        const userData = {
            username: interaction.user.id,
            email: `${interaction.user.id}@NAME-HEBERGEUR`,
            password: password,
            first_name: interaction.user.username,
            last_name: interaction.user.username,
            root_admin: false,
            language: "en",
        };
        
        let i = 1;
        list(i);
        function list(number){
            fetch({
                "url": `URL-DU-PANEL/api/application/users?page=${number}`,
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
                    if(i != r.meta.pagination.total_pages){
                        i++;
                        list(i);
                    }
                    else {
                        bot.Admin.createUser(userData)
                        .then(() => {
                            const embed = {
                                title: "Votre compte à bien été créé",
                                description: `Identifiant: ${interaction.user.id}\nMot de passe: ${password}`,
                                footer: {
                                    "text": "Ceci sont vos identifiants pour vous connecter à l’adresse suivante : URL-DU-PANEL"
                                },
                                color: Colors.Blurple
                            };
                            interaction.editReply({embeds: [embed]});
                        })
                        .catch(err => {
                            interaction.editReply({content: "Erreur lors de la création du compte."});
                            console.error(err)
                        });
                    }
                }
                if(id){
                     return interaction.editReply({content: "Vous avez déjà créé un compte."});
                }
            })
        }
    },
}