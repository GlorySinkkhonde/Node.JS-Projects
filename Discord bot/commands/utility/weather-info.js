const { SlashCommandBuilder } = require('discord.js');
const { apiKey } = require('../../config.json');

let fetch;
try {
    fetch = require('node-fetch');
} catch (error) {
    // If `require('node-fetch')` fails, use dynamic import instead
    fetch = async (url) => {
        const { default: fetch } = await import('node-fetch');
        return fetch(url);
    };
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Replies with weather information for a specified city')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The city to get the weather for')
                .setRequired(true)),
    async execute(interaction) {
        const city = interaction.options.getString('city');
        try {
            // Make a request to the OpenWeatherMap API to fetch weather information for the specified city
            const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(api);
            const data = await response.json();

            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            // Extract relevant weather data from the API response
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;

            // Format the weather information into a readable message
            const weatherInfo = `Current temperature in ${city}: ${temperature}°C\nWeather: ${weatherDescription}`;

            // Send the weather information as a reply to the user
            await interaction.reply(weatherInfo);
        } catch (error) {
            console.error('Error fetching weather information:', error);
            await interaction.reply('Sorry, there was an error fetching weather information.');
        }
    }
};
