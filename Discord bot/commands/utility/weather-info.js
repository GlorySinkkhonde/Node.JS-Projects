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
        .setDescription('Replies with weather information for current location!'),
    async execute(interaction) {
        try {
            // Retrieve the latitude and longitude of the user's current location (for demonstration, assume some coordinates)
            const lat = 40.7128; // Example latitude (New York City)
            const lon = -74.0060; // Example longitude (New York City)

            // Make a request to the OpenWeatherMap API to fetch weather information for the given coordinates
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const response = await fetch(api);
            const data = await response.json();

            // Extract relevant weather data from the API response
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;

            // Format the weather information into a readable message
            const weatherInfo = `Current temperature: ${temperature}°C\nWeather: ${weatherDescription}`;

            // Send the weather information as a reply to the user
            await interaction.reply(weatherInfo);
        } catch (error) {
            console.error('Error fetching weather information:', error);
            await interaction.reply('Sorry, there was an error fetching weather information.');
        }
    }
};
