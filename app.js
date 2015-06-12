/* 검색할 정규식 패턴을 라인 단위로 입력한 문서 바탕으로
*  지정된 경로상의 문서에서 정규식으로 조회해 위치를 콘솔로 출력
*/
var glob = require('glob');
var fs = require('fs');
var bufStr = null;
var bufArr = [];
var regexArr = [];
var dir = [];

//정규식 패턴 생성을 위함
var buildRegex = function (curArray) {
	for(i=0; curArray.length > i; i++) {
		//읽어 온 변수에서 캐리지 리턴 값을 없애 정규식 생성
		curArray[i] = new RegExp(curArray[i].replace(/[\n\r]/g, ''), 'gi');
	}
}

//정규식 조회 조건을 포함하는 문서
var readPattern = function() {
	fs.readFile( __dirname + '/regex.ptn', function (err, data) {
		if (err) {  
			throw err;
		}

		bufStr = data.toString();
		regexArr = bufStr.split('\n');		//이때는 단순한 문자 배열
		buildRegex(regexArr);			//이제부턴 정규식 배열
		
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
		
		searchLine(regexArr, bufArr);
	});
}

//정규식 패턴에 해당하는 라인 찾아서 콘솔에 출력
var searchLine = function (regexArr, lineArr) {
	
	for(j=0; regexArr.length > j; j++) {
		for(i=0; lineArr.length > i; i++) {
			lineArr[i].search(regexArr[j]) > -1 ? console.log( 'line#:' + i + '\tregexPtn: ' + regexArr[j] + '\ncontent: ' + lineArr[i] + '\n=========================') : '';
		}
	}
}

//기본 값으로 app.js가 있는 동일 경로상의 txt 파일만 찾게 끔 해놨습니다. 그 외의 건에 맞게끔 수정
glob( __dirname + "/*.txt", function (er, files) {

	dir = files;			//1. glob을 통해서 적합한 파일 경로 배열 전체 획득

	readPattern();			//2. 사전에 정의된 정규식 패턴 파일을 읽기

	for(k=0; dir.length > k; k++) {	
		searchFile(dir[k]);	//3. 가져온 경로 별로 내용을 정규식과 비교
	}
});




