import { Snackbar } from '../components/snackbar.js'
import { Header, HeaderEvent } from '../components/main/header.js'
import { Realtime, RealtimeEvent } from '../components/main/realtime.js'
import { Controller, ControllerEvent } from '../components/main/view_controller.js'
import { Posts, PostsEvent } from '../components/main/posts.js'

const MainContainer = ()=> {
	let view = `
	${Header()}
	${Realtime()}
	${Posts()}
	${Controller()}
	`;
	


	document.querySelector('#app').innerHTML = view;

	HeaderEvent();
	RealtimeEvent();
	ControllerEvent();
	PostsEvent();
}



export { MainContainer }