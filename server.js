// server.js
const express = require("express");
const cors = require("cors");
const moment = require("moment-timezone");

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Convert time between two timezones
 * Example URL: /convert?from=Asia/Kolkata&to=America/New_York&time=2025-04-02 14:00
 */
app.get("/convert", (req, res) => {
    const { from, to, time } = req.query;

    if (!from || !to || !time) {
        return res.status(400).json({ error: "Missing required parameters (from, to, time)" });
    }

    try {
        const sourceTime = moment.tz(time, from);
        const convertedTime = sourceTime.clone().tz(to).format("YYYY-MM-DD HH:mm:ss");
        res.json({ convertedTime });
    } catch (error) {
        console.error("Timezone conversion error:", error);
        res.status(500).json({ error: "Invalid timezone format or value" });
    }
});

/**
 * Weather API (OpenWeatherMap)
 * Example URL: /weather?city=London
 */
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

    if (!city) {
        return res.status(400).json({ error: "Missing city parameter" });
    }

    try {
        const fetch = (await import("node-fetch")).default;
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (data.cod !== 200) {
            return res.status(data.cod).json({ error: data.message });
        }
        res.json(data);
    } catch (error) {
        console.error("Weather API error:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

