// 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
// 네이버 검색 Open API 예제 - 블로그 검색
const express = require('express');

const app = express();
const clientId = 'hocsbGo_VMFE8dCIgvoF'; // 발급받은 CLIENT ID를 넣어줍니다.
const clientSecret = 'KoLNbQs04S'; // 발급받은 CLIENT SECRET을 넣어줍니다.
app.get('/search/blog', (req, res) => {
  const apiUrl = `https://openapi.naver.com/v1/search/blog?query=${encodeURI(req.query.query)}`; // json 결과
  //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
  const request = require('request');
  const options = {
    url: apiUrl,
    headers: { 'X-Naver-Client-Id': clientId, 'X-Naver-Client-Secret': clientSecret },
  };
  console.log('🚀 ~ app.get ~ options:', options);

  request.get(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log(`error = ${response.statusCode}`);
    }
  });
});
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!');
});
