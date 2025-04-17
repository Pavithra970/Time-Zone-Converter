document.addEventListener("DOMContentLoaded", function () {
    const fromSelect = document.getElementById("fromTimezone");
    const toSelect = document.getElementById("toTimezone");
    const timezones = moment.tz.names();

    // Populate dropdowns
    timezones.forEach(zone => {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");

        option1.value = option2.value = zone;
        option1.textContent = option2.textContent = zone;

        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
    });

    // Set default values
    fromSelect.value = "Asia/Kolkata";
    toSelect.value = "America/New_York";

    // Fetch weather initially
    getWeather();
});

// ✅ Live Clock Function (Inside Timezone Box)
function updateClock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();

    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12 || 12; // Convert to 12-hour format

    clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Update the clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// ✅ Convert Time Function
let convertedClockInterval;  // Global variable to clear previous interval
async function convertTime() {
    const from = document.getElementById("fromTimezone").value;
    const to = document.getElementById("toTimezone").value;
    const rawTime = document.getElementById("selectedTime").value;

    if (!rawTime) {
        alert("Please select a time.");
        return;
    }

    const formattedInput = rawTime.replace("T", " ");

    try {
        // Convert using moment (no need to call backend if you're doing client-side only)
        let sourceTime = moment.tz(formattedInput, "YYYY-MM-DD HH:mm", from);
        let convertedTime = sourceTime.clone().tz(to);

        // Clear previous interval
        if (convertedClockInterval) clearInterval(convertedClockInterval);

        // Start ticking from that converted time
        convertedClockInterval = setInterval(() => {
            convertedTime.add(1, 'seconds');  // tick forward
            document.getElementById("result").innerText =
                `✅ Live Converted Time in ${to}: ${convertedTime.format("YYYY-MM-DD hh:mm:ss A")}`;
        }, 1000);

        // Fetch weather info once
        getWeather();
    } catch (error) {
        console.error("Conversion Error:", error);
        document.getElementById("result").innerText = "⚠️ Conversion failed.";
    }
}


// ✅ Fetch Weather Based on "To Timezone"
const API_KEY = "5eb9d6b8ad21290e033b2b0bae723760"; // Replace with your API key

function getWeather() {
    const timezone = document.getElementById("toTimezone").value;
    const city = timezone.split('/').pop().replace('_', ' '); // Extract city from timezone

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const temp = data.main.temp;
                const weather = data.weather[0].description;
                document.getElementById("weatherInfo").innerText = `Weather in ${city}: ${weather}, Temp: ${temp}°C`;
            } else {
                document.getElementById("weatherInfo").innerText = "Weather information not found.";
            }
        })
        .catch(error => {
            document.getElementById("weatherInfo").innerText = "Error fetching weather.";
        });
}
