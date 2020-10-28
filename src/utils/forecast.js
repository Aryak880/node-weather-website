const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ encodeURIComponent(lat) +'&lon='+ encodeURIComponent(lon) +'&units=metric&appid=eb12452cbb4e58a154dad01e3a326275&exclude=minutely,hourly'

    request({url: url}, (err, res) => {

        if(err){
            callback('Unable to connet open Weather!', undefined)

        }else{
            const data = JSON.parse(res.body)

            if(data.message){
                callback(data.message, undefined)
            }

            else
                callback(undefined, {
                    feels_like: data.current.feels_like,
                    windSpeed : data.current.wind_speed,
                    timeZone : data.timezone,
                    humidity: data.current.humidity,
                    description: data.current.weather[0].description,
                    clouds: data.current.clouds
                })
        }

    })
}


module.exports = forecast