const express = require('express');
const logger = require('../lib/logger');

const router = express.Router();
const userService = require('../service/userService');
const gridUtils = require('../lib/gridUtil');
const superagent = require('superagent');
const { format } = require('date-fns');

// const loginRouter = require('../views/login.ejs');

router.get('/', async (req, res, next) => {
  try {
    console.log('🚀 ~ router.get ~ res:');

    res.render('category');
  } catch (err) {
    logger.error(`./router/weather.js.map: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const params = {
      gridX: req.query.gridX,
      gridY: req.query.gridY,
    };

    const apiURL = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    const nowFormat = format(new Date(), 'yyyyMMdd');
    let result;

    // callback
    const responseData = await superagent
      .get(apiURL)
      .query({
        ServiceKey: '5AixXeDNsKuyZ6zDiEY2sB5yTjp6RMUt0g+crj1vwJ8JZDDnkJ31fLeOg2rqahoBsyf1meC4oS2UlV4aggcgyg==',
        pageNo: '1',
        numOfRows: '10000',
        dataType: 'JSON',
        base_date: nowFormat,
        base_time: '0500',
        nx: params.gridX,
        ny: params.gridY,
      }); // query string

    const textData = JSON.parse(responseData.text);
    result = textData.response.body.items.item;
    const nowTime = `${format(new Date(), 'HH')}00`;
    // eslint-disable-next-line max-len
    result = result.filter((weather) => weather.fcstDate === nowFormat && weather.fcstTime === nowTime);
    res.status(200).json(result);

    // res.render('map');
  } catch (err) {
    logger.error(`./router/weather.js.map: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
