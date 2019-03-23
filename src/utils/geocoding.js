const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +
        '.json?access_token=pk.eyJ1Ijoib2JvbmdqIiwiYSI6ImNqdGs1bnRqMTAweDk0NHA5N2dxMjFyZ3AifQ.q44uvk5V3aGNXZzA0axjRQ&limit=1'

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to location services!.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try Again search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode