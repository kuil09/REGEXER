
var glob = require('glob');
var fs = require('fs');
var wstream = fs.createWriteStream('matched.csv');	//확인된 패턴이 matchd.csv 파일로 출력
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

//정규식 조회 조건을 포함하는 문서 regex.ptn 문서에 포함되며 특수문자의 경우 escape 처리가 필요
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

//조회 대상 경로. glob 모듈 사용자 설명 참조
glob( "C:/**/*.js", function (er, files) {	
	dir = files;

	readPattern();

	for(k=0; dir.length > k; k++) {
		searchFile(dir[k]);
	}
});




