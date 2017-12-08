/**
 * 01.12.17
 * @copyright die.interaktiven GmbH & Co. KG
 * @author Florian Gümbel <florian@die-interaktiven.de>
 */

const cheerio = require('cheerio');
const poster = require('./Request');
const jsonfile = require('jsonfile');

const NUMBER_RANGE = '7800,7801,7802,7803,7804,7805,7806,7807,7808,7809,7810,7811,7812,7813,7814,7815,7816,7817,7818,7819,7820,7821,7822,7823,7824,7825,7826,7827,7828,7829,7830,7831,7832,7833,7834,7835,7836,7837,7838,7839,7840,7841,7842,7843,7844,7845,7846,7847,7848,7849,7850,7851,7852,7853,7854,7855,7856,7857,7858,7859,7860,7861,7862,7863,7864,7865,7866,7867,7868,7869,7870,7871,7872,7873,7874,7875,7876,7877,7878,7879,7880,7881,7882,7883,7884,7885,7886,7887,7888,7889,7890,7891,7892,7893,7894,7895,7896,7897,7898,7899,7900,7901,7902,7903,7904,7905,7906,7907,7908,7909,7910,7911,7912,7913,7914,7915,7916,7917,7918,7919,7920,7921,7922,7923,7924,7925,7926,7927,7928,7929,7930,7931,7932,7933,7934,7935,7936,7937,7938,7939,7940,7941,7942,7943,7944,7945,7946,7947,7948,7949,7950';

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
  const dateRegex = /\d{1,2}\.d{2}\./;
  const priceRegex = /(Ihr Preis: )(.+)$/;

  list.each((index, item) => {
    const text = $(item).text();

    if (/^(Ihre)/.test(text)) {
      winners.push({
        number: (numberRegex.exec(text))[0],
        date: (dateRegex.exec(text))[0] + '2017',
        price: (priceRegex.exec(text))[2]
      });
    }

  });

  jsonfile.writeFile('public/data.json', winners, () => console.log('File Written'));

};

const isWinner = text => {

};
