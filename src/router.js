// import SPARouter from "@kodnificent/sparouter";
import SPARouter from "../node_modules/@kodnificent/sparouter/dist/sparouter.js"
import { App } from './app.js'
import { MainContainer } from './containers/main.js'

const app_ = new App();

const options = {
	historyMode : true
}
const router = new SPARouter(options);


// Home
router.get("/", function(req, router){ 
	app_.reset();
	MainContainer();
}).setName("Main");

// 404 Not found!
router.notFoundHandler(function(){
	fetch(window.location.pathname, {
		method: 'GET'
	});
});

router.init();
window.router = router;




export { router }