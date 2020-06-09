const Controller = ()=> {
	let view = `
	<div class="remote_control">
		<div id="upup_btn" class="circle_button noselect pointer upup_btn"></div>
		<div id="up_btn" class="circle_button noselect pointer up_btn"></div>
		<div id="down_btn" class="circle_button noselect pointer down_btn"></div>
		<div id="downdown_btn" class="circle_button noselect pointer downdown_btn"></div>
	</div>
	`;

	return view;
}

const ControllerEvent = ()=> {
	let intervalHandler;

	// 짧은 위
	document.querySelector("#up_btn").addEventListener("mousedown", ()=> {
		scrollUp();
		intervalHandler = setInterval(function() { scrollUp(); }, 500);
		return false;
	});
	// 긴 위
	document.querySelector("#upup_btn").addEventListener("mousedown", ()=> {
		scrollUpUP();
		intervalHandler = setInterval(function() { scrollUpUP(); }, 600);
		return false;
	});
	// 짧은 아래
	document.querySelector("#down_btn").addEventListener("mousedown", ()=> {
		scrollDown();
		intervalHandler = setInterval(function() { scrollDown(); }, 500);
		return false;
	});
	// 긴 아래
	document.querySelector("#downdown_btn").addEventListener("mousedown", ()=> {
		scrollDownDown();
		intervalHandler = setInterval(function() { scrollDownDown(); }, 600);
		return false;
	});
	document.querySelector("body").addEventListener("mouseup", ()=> {
		clearInterval(intervalHandler);
	})


	const scrollUpUP =()=> {
		scrollTo(0, window.scrollY - 2500);
	}
	const scrollUp =()=> {
		scrollTo(0, window.scrollY - 1000);
	}
	const scrollDown =()=> {
		scrollTo(0, window.scrollY + 1000);
	}
	const scrollDownDown =()=> {
		scrollTo(0, window.scrollY + 2500);
	}
}

export { Controller, ControllerEvent }