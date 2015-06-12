//참조링크 : http://jesusjzp.github.io/blog/2014/04/15/nodejs-read-file/

var fs = require('fs');

var bufferString;	
var bufferStringArr;	


fs.readFile( __dirname + '/test.txt', function (err, data) {
	if (err) {  
		throw err;
	}
	
	bufferString = data.toString();			//텍스트 문서를 변수에 담습니다.
	bufferStringArr = bufferString.split('\n');	//변수 내용을 개행문자 기준으로 나누어 배열에 담게 됩니다.
	
	console.log(bufferStringSplit);

});



