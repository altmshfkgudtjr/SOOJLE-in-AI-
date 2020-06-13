import { FETCH } from '../fetch.js'
import { Snackbar } from '../components/snackbar.js'
import qrcode from 'qrcode-generator'

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

// 교내 공모전 API
const ApiInnerContent = (callback)=> {
	FETCH('/api/v1/newsfeed/topic/키오스크_1', 'GET', null, (data)=> {
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

// 교외 공모전 API
const ApiOuterContent = (callback)=> {
	FETCH('/api/v1/newsfeed/topic/키오스크_2', 'GET', null, (data)=> {
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

const ApiRealTime = (callback)=> {
	FETCH('http://soojle.sejong.ac.kr/api/v1/analysis/realtime_keyword', 'GET', null, (data)=> {
		if (data.result == 'success') {
			if (typeof(callback) == 'function') {
				callback(data.search_realtime);
			} else {
				Snackbar("잘못된 데이터입니다.");
			}
		} else {
			console.log(data);
			Snackbar("서버와의 연결이 원활하지 않습니다.");
		}
	});
}

const ApiQrCode = (url, callback)=> {
	let qr = qrcode(0, 'L');	// 0 => autoDetection, others => Static
	qr.addData(url);
	qr.make();
	if (typeof(callback) == 'function') {
		callback(qr.createDataURL(8));
	} else {
		Snackbar("QR코드 생성에 실패하였습니다.");
	}
}

export { ApiNewsfeed, ApiRealTime, ApiQrCode, ApiOuterContent, ApiInnerContent }