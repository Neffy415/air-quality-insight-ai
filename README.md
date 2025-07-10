# 🌍 Air Quality Data Web App

This project is a web-based air quality monitoring tool that fetches real-time pollutant data using the **OpenAQ API** and displays it dynamically based on the user's geolocation. It was built using **Node.js**, **Express**, **Axios**, **EJS**, and styled with basic HTML/CSS.

---

## 🎯 Purpose

I created this project to **learn how to make complex API calls** and understand how to deal with real-world APIs that may not always return all the needed information in a single request.

While working with the OpenAQ API (v3), I discovered that retrieving detailed sensor data required multiple chained API calls. The API only returned sensor IDs in the initial response, so I had to loop through these IDs and make individual API requests for each sensor to get the necessary metadata.

This hands-on challenge helped me understand:

- How to **handle nested and chained API calls**
- Use of `async/await` and `Promise.all()` for better performance
- Securely managing API keys using **dotenv**
- Dynamically rendering values in the frontend using **EJS**
- Structuring and troubleshooting real-world REST APIs

---

## 🧠 Features

- 📍 Auto-geolocation to detect user's coordinates and fetch nearby air quality data
- 📊 Displays pollutants such as CO, NO₂, SO₂, PM2.5, and O₃
- 🔁 Uses multiple API calls to get detailed data for each sensor
- 📦 Renders data using EJS with conditional logic for loading and error states
- 🛠 Designed with simplicity and clarity to support future enhancements

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, EJS
- **APIs**: OpenAQ v3
- **Utilities**: Axios, dotenv, Geolocation API

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/yourusername/air-quality-api-app.git
cd air-quality-api-app
npm install
# Add your OPENAQ_API_KEY to a .env file
npm start
