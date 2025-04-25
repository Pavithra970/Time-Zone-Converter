
# 🌍 TimeZone Converter & Weather App

A lightweight, full-stack web application that allows users to convert time between different timezones and fetch real-time weather information for the selected destination — all within a clean, responsive interface.

---

## 📌 Features

-  **Live Clock:** Displays the current time in a 12-hour ticking clock format.
-  **Timezone Conversion:** Convert user-selected time between any two global timezones.
-  **Real-Time Weather:** Fetches live weather data for the selected "To Timezone" location using the OpenWeatherMap API.
-  **Responsive UI:** Fully functional on desktop and mobile browsers.
-  **No External Timezone APIs:** Uses `moment-timezone` to handle all timezone data.

---

## 🚀 Tech Stack

| Layer        | Technologies Used                     |
|--------------|----------------------------------------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla), Moment.js |
| **Backend**  | Node.js, Express.js, Moment-Timezone  |
| **APIs**     | OpenWeatherMap API for weather data   |

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/0744db2b-dbb2-4ddf-b69c-0a100f2c438b)


---
##Project Structure
timezone-converter-weather/
│
├── index.html              # Main frontend UI
├── about.html              # About page
├── help.html               # Help & FAQ page
├── style.css               # Styling for the app
├── app.js                  # Frontend logic (clock, conversion, weather)
├── server.js               # Express backend for time conversion
└── README.md               # Project overview and usage

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/timezone-converter-weather.git
cd timezone-converter-weather
