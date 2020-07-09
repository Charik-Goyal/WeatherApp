const request = require('request')
const forecast = (lat,long,callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(long)+'&units=metric&appid=ecb4a81cdfc1fc123d6c1246a6aa0a53'
    request({url,json:true},(error,{body}) =>{
        if(error){
            callback('unable to reach the server',undefined)
        }
        else if(body.message){
            callback('unable to reach the location',undefined)
        }
        else{
            callback(undefined,'It is currently ' + body.weather[0].description  +' Temperature is (in Celsius) ' + body.main.temp +' degree ' + 'And it feels like ' + body.main.feels_like + ' degree ' + ' and Humidity in atmosphere is ' + body.main.humidity + '% ' + ' the chances of getting rain is ' + body.clouds.all + ' %' + ' Max Temp today ' + body.main.temp_max + ' degree ' + 'and Min temp today is ' + body.main.temp_min + ' degree '
            )
        }
    })
}
module.exports = forecast