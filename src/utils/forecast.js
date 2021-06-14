const request = require('postman-request');


const forecast = (latitude, longitude, callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=0d702767f651bcf029abb28a5a3feebd&query='+latitude+','+longitude;
    request({url    , json:true}, (error, {body})=>{
        if(error){
            callback('Can\'t connect to the network', undefined);
        }
        else if(body.error ){
            callback('Location not found', undefined);
        }
        else{
            callback(undefined, {
                temperature: body.current.temperature,
                Feels_like: body.current.feelslike
            })
        }
    })
}

module.exports = forecast;

