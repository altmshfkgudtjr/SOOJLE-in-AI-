import { ApiRealTime } from '../../controllers/main.js'

const Realtime = ()=> {
	let view = `
	<div class="realtime_box">
		<div class="realtime_title noselect"><i class="fas fa-chart-line"></i> 실시간 검색어</div>
		<div class="realtime_cont">
			<div id="realword_box" class="realword_box"></div>
			<i class="fa fa-chevron-down menu_realtime_hover"></i>
		</div>
	</div>
	`;

	return view;
}

const RealtimeEvent = ()=> {
	ApiRealTime((data)=> {
		let target = document.querySelector("#realword_box");
		for (let idx in data) {
			let div = document.createElement('div');
			div.classList.add(...['noselect', 'realword']);
			let div_num = document.createElement('span');
			div_num.textContent = idx*1+1;
			div.append(div_num);
			div.innerHTML = `${div.innerHTML+data[idx][0]}`;
			target.append(div);
		}
		RealtimeSwap();
	});
}

const RealtimeSwap = ()=> {
	setTimeout(function() {
		document.querySelector("#realword_box").style.marginTop = '0';
		document.querySelector("#realword_box").style.marginTop = '-80px';
		setTimeout(function() {
			let block = document.querySelector(".realword");
			block.remove();
			document.querySelector("#realword_box").append(block);
			document.querySelector("#realword_box").style.transition = '0s ease-in-out';
			document.querySelector("#realword_box").style.marginTop = '0';
		}, 1000);
		setTimeout(function() {
			document.querySelector("#realword_box").removeAttribute("style");
			RealtimeSwap();
		}, 5000);
	}, 1000);
}

export { Realtime, RealtimeEvent }