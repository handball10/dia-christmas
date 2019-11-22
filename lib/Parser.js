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

const NUMBER_RANGE = new Array(NUMBER_RANGE_END - NUMBER_RANGE_START + 1).fill('').map(() => counter++).join(',');

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
        date: (dateRegex.exec(text))[0] + '2019',
        price: (priceRegex.exec(text))[2]
      });
    }

  });

  jsonfile.writeFile('public/data.json', winners, () => console.log('File Written'));

};

const isWinner = text => {

};
