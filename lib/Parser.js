/**
 * 01.12.17
 * @copyright die.interaktiven GmbH & Co. KG
 * @author Florian Gümbel <florian@die-interaktiven.de>
 */

const cheerio = require('cheerio');
const poster = require('./Request');
const jsonfile = require('jsonfile');


const NUMBER_RANGE_START = 15901;
const NUMBER_RANGE_END = 15961;

let counter = NUMBER_RANGE_START;

// const NUMBER_RANGE = new Array(NUMBER_RANGE_END - NUMBER_RANGE_START + 1).fill('').map(() => counter++).join(',');
const NUMBER_RANGE = '4237,4240,4259,3015,3024,3044,3046,3005,3032,10057,4256,3048,4251,3021,3036,3012,3023,4254,10063,10064,3045,10061,3038,4268,4243,3030,4239,10062,3009,3035,3047,4236,3034,3026,3010,3037,4242,4253,3016,3055,3006,3019,4269,3041,3050,4252,3039,4238,3052,3033,3054,10055,3018,3022,4246,3020,3051,4248,3049,10056,4245,4249,3014,10058,3042,3043,3013,10066,3040,10065,4241,10059,10060,4255,4250';

const WINNER_REGEX = /[\w ö]+ (\d+) [\w ]+ (\d{1,2}\.12\.)/;

exports.parse = function() {

  return poster
    .makePost(NUMBER_RANGE)
    .then(html => {
      processHTML(html);
    })
  ;

};

const processHTML = html => {
  const $ = cheerio.load(html);

  const list = $('.prices').children('li');

  const winners = [];
  const numberRegex = /\d{4}/;
  const dateRegex = /\d{1,2}\.\d{2}\./;
  const priceRegex = /(Ihr Preis: )(.+)$/;

  list.each((index, item) => {
    const text = $(item).text();

    console.log(text);

    if (/^(Ihre)/.test(text)) {
      winners.push({
        number: (numberRegex.exec(text))[0],
        date: (dateRegex.exec(text))[0] + (new Date().getFullYear()),
        price: (priceRegex.exec(text))[2]
      });
    }

  });

  jsonfile.writeFile('public/data.json', winners, () => console.log('File Written'));

};

const isWinner = text => {

};
