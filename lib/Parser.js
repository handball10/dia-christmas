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
const NUMBER_RANGE = '05502,05503,05504,05505,05506,05507,05508,05509,05510,05511,05512,05513,05514,05515,05516,05517,05518,05519,05520,05521,05522,05523,05524,05525,05526,05527,05528,05529,05530,05531,05532,05533,05534,05535,05536,05537,05538,05539,05540,05541,05542,05543,05544,05545,05546,05547,05548,05549,05550,05551,05552,05553,05554,05555,05556,05557,05558,05559,05560,05561,05562,05563,05564,05565,05566,05567,05568,05569,05570';

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
  // const $ = cheerio.load(html);
  //
  // const list = $('.prices').children('li');
  //
  // const winners = [];
  // const numberRegex = /\d{4}/;
  // const dateRegex = /\d{1,2}\.\d{2}\./;
  // const priceRegex = /(Ihr Preis: )(.+)$/;
  //
  // list.each((index, item) => {
  //   const text = $(item).text();
  //
  //   console.log(text);
  //
  //   if (/^(Ihre)/.test(text)) {
  //     winners.push({
  //       number: (numberRegex.exec(text))[0],
  //       date: (dateRegex.exec(text))[0] + (new Date().getFullYear()),
  //       price: (priceRegex.exec(text))[2]
  //     });
  //   }
  //
  // });

  jsonfile.writeFile('public/data.json', html, () => console.log('File Written'));

};

const isWinner = text => {

};
