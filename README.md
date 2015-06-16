# TUTORIALS
Node.JS 셀프 스터디의 일환으로 만든 정규식 데이터 조회 도구 입니다.

사용법
실행명령 node regexer.js


아래 내용을 기호에 맞게 수정하신 후 사용하시면 됩니다. 

regexer.js에서
1. 4 라인
  var wstream = fs.createWriteStream('matched.csv'); 
  조회 결과가 저장될 파일명을 'matched.csv'에서 원하는 파일명으로 변경하시기 바랍니다. (포맷 변경은 하지 마세요.)

2. 19 라인
	fs.readFile( __dirname + '/regex.ptn', {encoding: 'utf8'}, function (err, data) {
  조회를 위한 정규식들을 app.js와 동일한 경로 상에 regex.ptn 파일 상에 라인 단위로 만들어 줍니다.
  특수 문자는 escape 처리가 필수 입니다.
  
3. 58 라인
  glob( "C:/**/*.js", function (er, files) {	
  맨 앞의 경로를 수정해주시면 됩니다. 
  자세한 사용법은 glob의 매뉴얼을 참조하시기 바랍니다. https://www.npmjs.com/package/glob


