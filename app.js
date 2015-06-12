//아래 부분은 여기서 참조 해왔습니다. http://stackoverflow.com/questions/9890473/nodejs-load-file
var fs = require('fs'); //파일 시스템 모듈을 사용하겠다는 의미입니다.

//아래 readFile의 파라미터는 파일 경로 + 파일명, 콜백이 되겠습니다. 
fs.readFile( __dirname + '/test.txt', function (err, data) {  //__dirname은 노드에서 제공하는 글로벌 변수입니다.
	if (err) {  //에러 발생 시 throw를 해줍니다. JS도 예외 처리가 가능합니다. 
		throw err;
	}
	console.log(data.toString()); //파일 내용을 출력합니다.
});



