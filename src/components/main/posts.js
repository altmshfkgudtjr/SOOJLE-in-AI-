import { ApiInnerContent, ApiQrCode } from '../../controllers/main.js'


const Posts = ()=> {
	let view = `
	<div id="posts_box" class="posts_box noselect"></div>
	`;

	return view;
}

const PostsEvent = ()=> {
	ApiInnerContent((data)=> {
		InsertPosts(data);
	});
}

// 포스트 삽입
const InsertPosts = (data)=> {
	let title, src, url, _id, date, end_date, contest_check, contest_block, check;
	let target = document.querySelector("#posts_box");
	target.innerHTML = "";
	for (let post of data) {
		contest_check = false;
		check = 0;
		title = post['title'];
		src = post['img'];
		url = post['url'];
		_id = post['_id']['$oid'];
		if (post['date'].$date) date = post['date'].$date;
		else date = post['date'];
		if (post['end_date']) {
			if (post['end_date'].$date) end_date = post['end_date'].$date;
			else end_date = post['end_date'];
			if (IsContest(end_date)) {					// 공모전 게시글 판별
				contest_check = true;
				date = change_date_realative(end_date);
			} else {
				date = change_date_realative(date);
			}
		} else {
			date = change_date_realative(date);
		}
		if (contest_check == true) {
			if (new Date(end_date) > new Date(Date.now())) {
				contest_block = `<div class="contest_ing">진행중</div>`;
			} else {
				contest_block = `<div class="contest_done">마감</div>`;
			}
		} else {
			contest_block = ``;
		}
		if (src.toString().indexOf("everytime") != -1) {
			src = "./static/images/everytime.jpg";
			check = 1;
		} else if (src.toString().indexOf("daum") != -1) {
			src = "./static/images/sjstation.png";
			check = 1;
		} else if (src.toString().length > 10) {
			check = 1;
		}
		let box = document.createElement('div');
		box.classList.add(...['post', 'pointer']);
		box.setAttribute('p-id', _id);
		if (src.length < 10 || src.length == undefined && check == 0) {
			let box_a1_ct = document.createElement('div');
			box_a1_ct.classList.add(...['post_title_cont_noimg', 'noselect']);
			let box_a1_ct_title = document.createElement('div');
			box_a1_ct_title.classList.add('post_title');
			box_a1_ct_title.textContent = title;
			box_a1_ct.append(box_a1_ct_title);

			for (let tag of post['tag']) {
				let tag_box = document.createElement('div');
				tag_box.classList.add(...['tag', 'noselect']);
				tag_box.textContent = tag;
				box_a1_ct.append(tag_box);
			}

			let box_a1_ct_date = document.createElement('div');
			box_a1_ct_date.classList.add('post_date');
			box_a1_ct_date.innerHTML = `<i class="far fa-clock"></i> ${date}${contest_block}`;
			box_a1_ct.append(box_a1_ct_date);

			box.append(box_a1_ct);
		} else {
			let box_a1_img = document.createElement('div');
			box_a1_img.classList.add(...['post_view_card_img', 'noselect']);
			box_a1_img.style.backgroundImage = `url('${src}')`;
			box.append(box_a1_img);
			let box_a1_ct = document.createElement('div');
			box_a1_ct.classList.add('post_title_cont');
			let box_a1_ct_title = document.createElement('div');
			box_a1_ct_title.classList.add('post_title');
			box_a1_ct_title.textContent = title;
			box_a1_ct.append(box_a1_ct_title);

			for (let tag of post['tag']) {
				let tag_box = document.createElement('div');
				tag_box.classList.add(...['tag', 'noselect']);
				tag_box.textContent = tag;
				box_a1_ct.append(tag_box);
			}

			let box_a1_ct_date = document.createElement('div');
			box_a1_ct_date.classList.add('post_date');
			box_a1_ct_date.innerHTML = `<i class="far fa-clock"></i> ${date}${contest_block}`;
			box_a1_ct.append(box_a1_ct_date);

			box.append(box_a1_ct);
		}
		box.addEventListener("mouseup", ()=> {
			PostView(post['url']);
		});
		target.append(box);
	}
}

// 포스트 View
const PostView = (url)=> {
	ApiQrCode(url, (data)=> {
		let target = document.querySelector("body");
		target.style.overflow = 'hidden';
		let background = document.createElement('div');
		background.classList.add(...['option_background', 'pointer', 'noselect']);
		background.addEventListener("click", PostViewOff);
		let content = document.createElement('div');
		content.classList.add(...['option_cont', 'noselect']);

		let title = document.createElement('div');
		title.classList.add('option_title');
		title.textContent = "게시글 QR 코드";
		content.append(title);

		let qr = document.createElement('img');
		qr.classList.add('option_qr');
		qr.src = data;
		content.append(qr);

		let qr_info = document.createElement('div');
		qr_info.classList.add('option_info');
		qr_info.textContent = "스마트폰으로 해당 사이트를 바로 확인해보세요!";
		content.append(qr_info);

		background.append(content);
		target.append(background);
	});
}

const PostViewOff = ()=> {
	if (!event.srcElement.classList.contains('option_background')) return;
	document.querySelector("body").removeAttribute("style");
	document.querySelector(".option_background").remove();
}


// 몇일전 몇분전 표기
const change_date_realative =(dt)=> {
	let min = 60 * 1000;
	let c = new Date()
	let d = new Date(dt);
	d.setHours(d.getHours() - 9);	// 한국 시간 기준
	let minsAgo = Math.floor((c - d) / (min));
	let result = {
		'raw': d.getFullYear() + '-' + 
		(d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) + '-' + 
		(d.getDate() > 9 ? '' : '0') +  d.getDate() + ' ' + 
		(d.getHours() > 9 ? '' : '0') +  d.getHours() + ':' + 
		(d.getMinutes() > 9 ? '' : '0') +  d.getMinutes() + ':'  + 
		(d.getSeconds() > 9 ? '' : '0') +  d.getSeconds(),
		'formatted': '',
		'string_raw': d.getFullYear() + '년 ' + 
		/*(d.getMonth() + 1 > 9 ? '' : '0') +*/ (d.getMonth() + 1) + '월 ' + 
		/*(d.getDate() > 9 ? '' : '0') +*/  d.getDate() + '일'
	};
	if (c.getFullYear() == d.getFullYear()) {
		result['string_relative'] = (d.getMonth() + 1) + '월 ' + d.getDate() + '일'
	} else {
		result['string_relative'] = result.string_raw;
	}
	if (minsAgo < 60 && minsAgo >= 0) { 										// 1시간 내
		result.formatted = minsAgo + '분 전';
	} else if (minsAgo < 60 * 24 && minsAgo >= 0) { 							// 하루 내
		result.formatted = Math.floor(minsAgo / 60) + '시간 전';
	} else if (minsAgo < 60 * 25 * 7 && minsAgo >= 0) {							// 7일 내
		result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전 ';
	} else if (minsAgo < 60 * 25 * 7 * 4 && minsAgo >= 0) {						// 한달 내
		result.formatted = Math.floor(minsAgo / 60 / 24 / 7) + '주 전 ';
	} else if (minsAgo < 60 * 25 * 7 * 4 * 13 && minsAgo >= 0) {				// 1년 내
		result.formatted = Math.floor(minsAgo / 60 / 24 / 7 / 4) + '개월 전 ';
	} else if (minsAgo >= 0) { 													// 1년 이상
		result.formatted = Math.floor(minsAgo / 60 / 24 / 7 / 4 / 12) + '년 전 ';
	}
	 else {																	// 현재 이후
		result.formatted = result.string_raw + "까지";
	}
	return result.formatted;
}
// 3000년 게시글인지 확인 : Custom 기능
 const IsContest = (dt)=> {
	let d = new Date(dt);
	if (d.getFullYear() == 3000) return false;
	return true;
}
const check_image = (tag)=> {
	let onerror = `./static/image/shortcut_black.jpg`;
	if (tag.querySelector("div.post_block_img_cont") == undefined) return false;
	if (tag.querySelector("div.post_block_img_cont").style.backgroundImage == undefined) return false;
	let img_url = tag.querySelector("div.post_block_img_cont").style.backgroundImage.slice(5, -2);
	let checkimg = new Image();
	let p_id = tag.getAttribute("p-id");
	checkimg.onerror = function() {
		try {
			document.querySelector("#posts_target div[p-id=${p_id}] div.post_block_img_cont").css("background-image", `url(${onerror})`);
		} catch(e) {
			console.log(e);
		}
	}
	checkimg.onload = function() {
		// Image Loading Success
	}
	checkimg.src = img_url;
}

export { Posts, PostsEvent, InsertPosts }