const request = require('postman-request');


const geocode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiZ3V5dHJvbiIsImEiOiJja3BzMDVseXMweXNxMnZzNHQwZnQ2Zmh2In0.54XdUgICrLiny_saUSoP_w&limit=1"
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Can\'t connect to the network', undefined);
        }
        else if(body.features.length===0 ){
            callback('Location not found', undefined);
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode;