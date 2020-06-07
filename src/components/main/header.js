import { router } from '../../router.js'

const Header = ()=> {
	let view = `
		<div class="header">
			<img src="/static/images/daeyang.png" class="noselect character">
			<img id="logo" src="/static/images/SOOJLE_LOGO_BIG.png" class="logo noselect pointer">
			<div id="restaurant_btn" class="circle_button restaurant_btn noselect pointer"></div>
		</div>
	`;

	return view;
}

const HeaderEvent = ()=> {
	document.querySelector("#logo").addEventListener("click", ()=> {
		router._goTo("/");
	});
}

export { Header, HeaderEvent }