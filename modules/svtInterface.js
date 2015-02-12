/**
 * Created by dani on 12.02.15.
 */
var request = require('request');
var cheerio = require('cheerio');

var getDepartures = function(id, callback){
    request('http://www.swtue.de/abfahrt/?halt=' + id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var departures = [];
            $ = cheerio.load(body);
            for(var i = 0; i < $('td[class=linie]').length;i++) {
                var connection = {};
                connection.line = $('td[class=linie]')[i].children[0].data.replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g,"");
                connection.direction = $('td[class=richtung]')[i].children[0].data.replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g,"");
                var depart = $('td[class=abfahrt]')[i].children[0].data.replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g,"");
                var hsplit  = depart.indexOf("h");
                if(hsplit > -1){
                    connection.departure = depart.slice(0,hsplit + 1) + " " + depart.slice(hsplit + 1);
                }
                else {
                    connection.departure = depart;
                }
                departures.push(connection);
            }
            console.log(departures);
            callback(error,departures);
        }
    });
};

module.exports.getDepartures = getDepartures;
