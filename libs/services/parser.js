/**
 * Created by flori on 04.12.2016.
 */

var request = require('request'),
    cheerio = require('cheerio'),
    winston = require('winston'),
    q = require('q'),
    _ = require('lodash'),
    jsonfile = require('jsonfile')
;


var url = 'http://www.terratech-ngo.de/de/spenden-helfen/aktionen/adventskalender',
    postData = {
        'jform[ticketNumbers]' : '7650,7651,7652,7653,7654,7655,7656,7657,7658,7659,7660,7661,7662,7663,7664,7665,7666,7667,7668,7669,7670,7671,7672,7673,7674,7675,7676,7677,7678,7679,7680,7681,7682,7683,7684,7685,7686,7687,7688,7689,7690,7691,7692,7693,7694,7695,7696,7697,7698,7699,7700',
        '0585898dcb4709d7cb0a117d44bec36e' : 1
    }

;

module.exports = (function(){

    this.makeRequest = function(){

        var deferred = q.defer();

        request.post(
            url,
            function(err, httpResponse, body){
                deferred.resolve(parseRequest(body));
            }
        ).form(postData);



        return deferred.promise;
    };

    function parseRequest(body) {
        var $ = cheerio.load(body);

        var list = $('.prices li');

        var winners = [],
            numberRegex = /\d{4}/,
            dateRegex = /\d{1,2}\.\d{2}\./,
            priceRegex = /(Ihr Preis: )(.+)$/
            ;

        list.each(function (index, item) {
            var text = $(this).text();

            if (/^(Ihre)/.test(text)) {
                winners.push({
                    number: (numberRegex.exec(text))[0],
                    date: (dateRegex.exec(text))[0] + '2016',
                    price: (priceRegex.exec(text))[2]
                });
            }

        });

        jsonfile.writeFile('public/data.json', winners, function () {
            console.log('written');
        });

        return winners;
    }

    return this;

})();