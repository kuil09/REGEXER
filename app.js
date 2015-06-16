/* ACTION_REQUIRED 라고 지정된 행에 존재하는 변수나 경로는 사용자 환경에 맞추어 수정하시면 됩니다.
*  아래의 regex.ptn이라는 문서는 app.js와 동일 경로 상에 존재해야 하며 라인 단위로 정규식을 넣어주시면 됩니다.
*  맨 아래쪽의 glob 모듈을 사용하는 부분에 대해서는 검색 대상인 경로를 확인하셔야 합니다. 
*  OS별로 역슬래시와 슬래시의 차이가 있습니다. (UNIX계열과 윈도우 계열의 차이입니다.)
*  알려진 이슈 : 1. 인코딩 차이에 대해서는 아직 해결한 바가 없습니다. UTF-8을 전제로 작업했습니다.
*                2. 마이크로 소프트의 엑셀에서는 CSV 파일의 UTF-8 인코딩을 지원하지 않습니다. 필요하시면 별도로 수정하셔서 사용하세요.
*/


var glob = require('glob');
var fs = require('fs');
var wstream = fs.createWriteStream('matched.csv');	//ACTION_REQUIRED 확인된 패턴이 matchd.csv 파일로 출력
var bufStr = null;
var bufArr = [];
var regexArr = [];
var dir = [];

//정규식 패턴 생성을 위함
var buildRegex = function (curArray) {
	for(i=0; curArray.length > i; i++) {
		curArray[i] = new RegExp(curArray[i].replace(/[\n\r]/g, ''), 'gi');	//읽어 온 변수에서 캐리지 리턴 값을 없애 정규식 생성
	}
}

//ACTION_REQUIRED 정규식 조회 조건을 포함하는 문서 regex.ptn 문서에 포함되며 특수문자의 경우 escape 처리가 필요
var readPattern = function() {
	fs.readFile( __dirname + '/regex.ptn', {encoding: 'utf8'}, function (err, data) {
		if (err) {  
			throw err;
		}

		bufStr = data.toString();
		regexArr = bufStr.split('\n');		//이때는 단순한 문자 배열
		buildRegex(regexArr);				//이제는 정규식을 포함한 배열
		
	});
}

//검색 대상 디렉토리 문서
var searchFile = function (filePath) {
	fs.readFile(filePath, function (err, data) {
		if (err) {  
			throw err;
		}

		bufStr = data.toString();
		bufArr = bufStr.split('\n');
		burStr = null;
		
		searchLine(filePath, regexArr, bufArr);
	});
}

//정규식 패턴에 해당하는 라인 찾아서 콘솔에 출력
var searchLine = function (filePath, regexArr, lineArr) {

	
	for(j=0; regexArr.length > j; j++) {
		for(i=0; lineArr.length > i; i++) {
			lineArr[i].search(regexArr[j]) > -1 ? wstream.write(filePath +' , ' + i + ' , ' + regexArr[j] + ' , ' + lineArr[i] + '\n') : '';
		}
	}
}

//ACTION_REQUIRED 조회 대상 경로. glob 모듈 사용자 설명 참조
glob( "C:/**/*.js", function (er, files) {	
	dir = files;

	readPattern();

	for(k=0; dir.length > k; k++) {
		searchFile(dir[k]);
	}
});




