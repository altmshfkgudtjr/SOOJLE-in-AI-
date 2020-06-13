import { ApiInnerContent, ApiOuterContent } from '../../controllers/main.js'
import { InsertPosts } from './posts.js'

const Tab = ()=> {
	let view = `
	<div class="tab_cont noselect">
		<div class="tab">
			<div id="inner" class="tab_btn pointer">교내 공모전</div>
		</div
		><div class="tab">
			<div id="outer" class="tab_btn pointer tab_select">교외 공모전</div>
		</div>
	</div>
	`;

	return view;
}

const TabEvent = ()=> {
	document.querySelector('#inner').addEventListener("click", ()=> {
		document.querySelector('#outer').classList.remove("tab_select");
		document.querySelector('#inner').classList.add("tab_select");
		ApiInnerContent((data)=> {
			InsertPosts(data);
		});
	});
	document.querySelector('#outer').addEventListener("click", ()=> {
		document.querySelector('#inner').classList.remove("tab_select");
		document.querySelector('#outer').classList.add("tab_select");
		ApiOuterContent((data)=> {
			InsertPosts(data);
		});
	});
}

export { Tab, TabEvent }