/**
 * 01.12.17
 * @copyright die.interaktiven GmbH & Co. KG
 * @author Florian Gümbel <florian@die-interaktiven.de>
 */

const request = require('request');

exports.makePost = function(numberRange) {
  return new Promise((resolve, reject) => {
    request
      .post('https://www.terratech-ngo.de/wp-admin/admin-ajax.php', {
          form: {
            'winningNumbers': numberRange,
            'action': 'check_winning_numbers'
          }
        },
        (err, response, html) => resolve(html)
      )
    ;
  });
};
