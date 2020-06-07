import { Snackbar } from './components/snackbar.js'

const FETCH = (URL, METHOD, DATA, callback) => {
	if (METHOD == "GET") {
		fetch(URL, {
			method: METHOD
		})
		.then(res => res.json())
		.then((res) => {
			if (typeof(callback) == 'function') {
				callback(res);
			}
		})
		.catch((err)=> {
			console.log(err);
			Snackbar("Server Error");
		});
	} else {
		fetch(URL, {
			method: METHOD,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(DATA)
		})
		.then(res => res.json())
		.then((res)=> {
			if (typeof(callback) == 'function') {
				callback(res);
			}
		})
		.catch((err)=> {
			console.log(err);
			Snackbar("Server Error");
		});
	}
}

export { FETCH }