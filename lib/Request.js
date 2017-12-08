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
            '6435454487fd423db0b054b92bd61abc': 1
          }
        },
        (err, response, html) => resolve(html)
      )
    ;
  });
};
