/**
 * 01.12.17
 * @copyright die.interaktiven GmbH & Co. KG
 * @author Florian Gümbel <florian@die-interaktiven.de>
 */

const cheerio = require('cheerio');
const poster = require('./Request');
const jsonfile = require('jsonfile');

const NUMBER_RANGE = '1190,1191,1192,1193,1194,1195,1196,1197,1198,1199,1200,1201,1202,1203,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218,1219,1220,1221,1222,1223,1224,1225,1226,1227,1228,1229,1230,1231,1232,1233,1234,1235,1236,1237,1238,1239,1240,1241,1242,1243,1244,1245,1246,1247,1248,1249,1250,1251,1252,1253,1254,1255,1256,1257,1258,1259,1260,1261,1262,1263,1264,1265,1266,1267,1268,1269,1270,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1281,1282,1283,1284,1285,1286,1287,1288,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1310,1311,1312,1313,1314,1315,1316,1317,1318,1319,1320';

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
        date: (dateRegex.exec(text))[0] + '2018',
        price: (priceRegex.exec(text))[2]
      });
    }

  });

  jsonfile.writeFile('public/data.json', winners, () => console.log('File Written'));

};

const isWinner = text => {

};