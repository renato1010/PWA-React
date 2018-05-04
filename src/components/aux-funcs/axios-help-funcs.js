import axios from 'axios';

const BASE_URL = 'http://api.football-data.org/v1/competitions/467/fixtures';
const FD_TOKEN = '5aa68225b66a4500ac98207d568b08ec';
const HEADER_AUTH = {
  'X-Auth-Token': FD_TOKEN
};
const IMG_BASE_URL = 'http://www.countryflags.io/';
const mapCoutryCode = {
  Russia: { cod: 'ru', es: 'Rusia' },
  'Saudi Arabia': { cod: 'sa', es: 'Arabia Saudita' },
  Egypt: { cod: 'eg', es: 'Egipto' },
  Uruguay: { cod: 'uy', es: 'Uruguay' },
  Morocco: { cod: 'ma', es: 'Marruecos' },
  Iran: { cod: 'ir', es: 'Iran' },
  Portugal: { cod: 'pt', es: 'Portugal' },
  Spain: { cod: 'es', es: 'Espana' },
  France: { cod: 'fr', es: 'Francia' },
  Australia: { cod: 'au', es: 'Australia' },
  Peru: { cod: 'pe', es: 'Peru' },
  Denmark: { cod: 'dk', es: 'Dinamarca' },
  Argentina: { cod: 'ar', es: 'Argentina' },
  Iceland: { cod: 'is', es: 'Islandia' },
  Croatia: { cod: 'hr', es: 'Croacia' },
  Nigeria: { cod: 'ne', es: 'Nigeria' },
  'Costa Rica': { cod: 'cr', es: 'Costa Rica' },
  Serbia: { cod: 'rs', es: 'Serbia' },
  Brazil: { cod: 'br', es: 'Brazil' },
  Switzerland: { cod: 'ch', es: 'Suiza' },
  Germany: { cod: 'de', es: 'Alemania' },
  Mexico: { cod: 'mx', es: 'Mexico' },
  Sweden: { cod: 'se', es: 'Suecia' },
  'Korea Republic': { cod: 'kr', es: 'Corea del Sur' },
  Belgium: { cod: 'be', es: 'Belgica' },
  Panama: { cod: 'pa', es: 'Panama' },
  Tunisia: { cod: 'tn', es: 'Tunez' },
  England: { cod: 'gb', es: 'Inglaterra' },
  Poland: { cod: 'pl', es: 'Polonia' },
  Senegal: { cod: 'sn', es: 'Senegal' },
  Colombia: { cod: 'co', es: 'Colombia' },
  Japan: { cod: 'jp', es: 'Japon' }
};
const IMG_SIZE = '48';
export const getTodosLosPartidos = () => {
  return axios
    .get(BASE_URL, {
      headers: HEADER_AUTH
    })
    .then(response => {
      // solo tamaremos los partidos de la primera ronda 48 juegos
      const resArr = response['data']['fixtures'].slice(0, 48);
      const transformedArr =  resArr.map(item => insertFlagUrls(item));
      return transformedArr;
    })
    .catch(error => error.message);
};

function insertFlagUrls(teamObj) {
  let { awayTeamName, homeTeamName } = teamObj;
  const awayTeamFlagImg = `${IMG_BASE_URL}${
    mapCoutryCode[awayTeamName]['cod']
  }/shiny/${IMG_SIZE}.png`;
  const homeTeamFlagImg = `${IMG_BASE_URL}${
    mapCoutryCode[homeTeamName]['cod']
  }/shiny/${IMG_SIZE}.png`;
  awayTeamName = mapCoutryCode[awayTeamName]['es'];
  homeTeamName = mapCoutryCode[homeTeamName]['es'];
  return Object.assign({}, teamObj, {
    awayTeamName,
    homeTeamName,
    awayTeamFlagImg,
    homeTeamFlagImg
  });
}
