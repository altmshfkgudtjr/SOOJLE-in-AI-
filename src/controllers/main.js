import { FETCH } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'

const ApiNewsfeed = (callback)=> {
	FETCH('http://soojle.sejong.ac.kr/api/v1/newsfeed/recommendation', 'GET', null, (data)=> {
		if (data.result == 'success') {
			if (typeof(callback) == 'function') {
				callback(JSON.parse(data['newsfeed']));
			} else {
				Snackbar("잘못된 데이터입니다.");
			}
		} else {
			console.log(data);
			Snackbar("서버와의 연결이 원활하지 않습니다.");
		}
	});
}

export { ApiNewsfeed }