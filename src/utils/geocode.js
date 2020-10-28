const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXJ5YWtzaW5naGNoYXVoYW4iLCJhIjoiY2tnbnFhZ2JkMDlwbTM3bXNiNThweHhxaiJ9.jECfTyIqBsThaKh9bLZwEg&limit=1'

    request({url: url, json: true}, (err, res) => {

        if(err){
            callback('Unable to connect the Server', undefined)

        } else if(res.body.features.length === 0){
            callback("Unable to find location! Try another search", undefined)

        }else{
            const data = res.body.features[0]

            callback(undefined, {
                longitude: data.center[0],
                latitude: data.center[1],
                placeName: data.place_name
            })
        }
    })
}

module.exports = geoCode