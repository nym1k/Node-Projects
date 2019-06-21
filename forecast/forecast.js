// Problem: We need a simple way to look at a user's weather forecast for their postcode area
// Solution: Use Node.js to connect to the Forecast.io API to get weather information to print out

const https = require('https')

function getLatLng(postcode) {
  // Connect to the Postcodes.io API URL (url)
  const req = https.get(`https://api.postcodes.io/postcodes/${postcode}`, res => {
    let body = ""
    res.on('data', data => {
      body += data.toString()
    })

    res.on('end', () => {
      const postcodeData = JSON.parse(body)
      // console.log(postcodeData);
      const lng = postcodeData.result.longitude
      const lat = postcodeData.result.latitude
      const location = postcodeData.result.parish
      getForecast(lat, lng, location)
    })
  })
}

function getForecast(lat, lng, location) {
  // Connect to the Forecast.io API URL (url)
  const req = https.get(`https://api.darksky.net/forecast/26a6920c013eecb823f107f10098a3ce/${lat},${lng}?units=si`, res => {
    let body = ""
    res.on('data', data => {
      body += data.toString()
    })

    res.on('end', () => {
      const forecastData = JSON.parse(body)
      const summary = forecastData.currently.summary
      const temp = forecastData.currently.temperature
      const daily = forecastData.daily.summary
      // console.log(forecastData);
      const forecastMessage = `The weather forcast for ${location} today is: ${summary} with a temperature of ${temp}°c. The forecast for later in the week is: ${daily}`
      console.log(forecastMessage);
    })
  })
}

const postcode = process.argv.slice(2)
getLatLng(postcode)
