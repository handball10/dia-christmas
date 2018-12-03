/**
 * 01.12.17
 * @copyright die.interaktiven GmbH & Co. KG
 * @author Florian Gümbel <florian@die-interaktiven.de>
 */

const request = require('request');

exports.makePost = function(numberRange) {
  return new Promise((resolve, reject) => {
    request
      .post('https://www.terratech-ngo.de/de/spenden-helfen/aktionen/adventskalender', {
          form: {
            'jform[ticketNumbers]': numberRange,
            '3ae14e09dfa81dedbc3e61d8739fb270': 1
          }
        },
        (err, response, html) => resolve(html)
      )
    ;
  });
};
