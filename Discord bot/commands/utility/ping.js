const { SlashCommandBuilder } = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()
          .setName('ping')
          .setDescription('Replies with Pong!'),
    async execute(interaction) {

        const api = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
        await interaction.reply('Pong!')
    }

}