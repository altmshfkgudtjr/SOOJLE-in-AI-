import { router } from '../../router.js'

const Header = ()=> {
	let view = `
		<div class="header">
			<img src="/static/image/daeyang.png" class="noselect character">
			<img id="logo" src="/static/image/SOOJLE_LOGO_BIG.png" class="logo noselect pointer">
			<div id="restaurant_btn" class="circle_button restaurant_btn noselect pointer"></div>
		</div>
	`;

	return view;
}

const HeaderEvent = ()=> {
	document.querySelector("#logo").addEventListener("click", ()=> {
		location.reload();
	});
	document.querySelector("#restaurant_btn").addEventListener("click", ()=> {
		Restaurant();
	});
}

const Restaurant = ()=> {
	let target = document.querySelector("body");
	target.style.overflow = 'hidden';
	let background = document.createElement('div');
	background.classList.add(...['food_background', 'pointer']);
	background.addEventListener("click", RestaurantOff);
	let content = document.createElement('div');
	content.classList.add(...['food_content', 'noselect','animated', 'wow', 'slideInRight']);

	let title = document.createElement('div');
	title.classList.add('food_title');
	title.innerHTML = `<img src="/static/icons/blue_restaurant.png"> 학식 OPEN/CLOSE`;
	content.append(title);

	let menu_box = document.createElement('div');
	menu_box.classList.add("menu_box");
	menu_box.innerHTML = `
		<div class="guide_restaurant_box">
			<div class="guide_restaurant_box_title">학생회관 푸드코트</div>
			<div>
				<div class="guide_restaurant_box_type">학기중</div>
				<div class="guide_restaurant_box_post">
					평일: 09:00 ~ 19:00<br>
					토요일: 10:30 ~ 14:00<br>
					(일요일, 공휴일 휴무)
				</div>
				<div class="guide_restaurant_box_type">방학중</div>
				<div class="guide_restaurant_box_post">
					평일: 09:00 ~ 19:00<br>
					토요일: 10:30 ~ 14:00<br>
					(일요일, 공휴일 휴무)
				</div>
			</div>
		</div><div class="guide_restaurant_box">
			<div class="guide_restaurant_box_title">군자키친</div>
			<div>
				<div class="guide_restaurant_box_type">학기중</div>
				<div class="guide_restaurant_box_post">
					평일: 09:00 ~ 19:00<br>
					(토,일요일, 공휴일 휴무)
				</div>
				<div class="guide_restaurant_box_type">방학중</div>
				<div class="guide_restaurant_box_post">
					평일: 09:00 ~ 19:00<br>
					(토,일요일, 공휴일 휴무)
				</div>
			</div>
		</div><div class="guide_restaurant_box">
			<div class="guide_restaurant_box_title">진관키친</div>
			<div>	
				<div class="guide_restaurant_box_type">학기중</div>
				<div class="guide_restaurant_box_post">
					평일: 08:30 ~ 19:00<br>
					(토,일요일, 공휴일 휴무)
				</div>
				<div class="guide_restaurant_box_type">방학중</div>
				<div class="guide_restaurant_box_post">
					평일: 08:30 ~ 19:00<br>
					(토,일요일, 공휴일 휴무)
				</div>
			</div>
		</div><div class="guide_restaurant_box">
			<div class="guide_restaurant_box_title">우정당 푸드코트</div>
			<div>
				<div class="guide_restaurant_box_type">학기중</div>
				<div class="guide_restaurant_box_post">
					평일: 09:00 ~ 19:00<br>
					토요일: 10:00 ~ 14:00<br>
					(일요일, 공휴일 휴무)
				</div>
				<div class="guide_restaurant_box_type">방학중</div>
				<div class="guide_restaurant_box_post">
					휴무
				</div>
			</div>
		</div><div class="guide_restaurant_box">
			<div class="guide_restaurant_box_title">군자의 밥상</div>
			<div>
				<div class="guide_restaurant_box_type">학기중</div>
				<div class="guide_restaurant_box_post">
					점심: 11:30 ~ 14:00<br>
					저녁: 17:00 ~ 18:30<br>
					(토,일요일, 공휴일 휴무)
				</div>
				<div class="guide_restaurant_box_type">방학중</div>
				<div class="guide_restaurant_box_post">
					점심: 11:30 ~ 13:30<br>
					저녁: 17:00 ~ 18:00<br>
					(토,일요일, 공휴일 휴무)
				</div>
			</div>
		</div><div class="guide_restaurant_box">
			<div class="guide_restaurant_box_title">더큰도시락</div>
			<div>
				<div class="guide_restaurant_box_type">학기중</div>
				<div class="guide_restaurant_box_post">
					평일: 09:00 ~ 19:00<br>
					토요일: 10:30 ~ 14:00<br>
					(일요일, 공휴일 휴무)
				</div>
				<div class="guide_restaurant_box_type">방학중</div>
				<div class="guide_restaurant_box_post">
					평일: 08:00 ~ 20:00<br>
					토요일: 08:00 ~ 20:00<br>
					(일요일, 공휴일 휴무)
				</div>
			</div>
		</div>
	`;
	content.append(menu_box);

	let menu_info = document.createElement('div');
	menu_info.classList.add('menu_info');
	menu_info.textContent = "※ 코로나19의 영향으로 운영시간이 변경될 수 있습니다.";
	content.append(menu_info);

	background.append(content);
	target.append(background);
}

const RestaurantOff = ()=> {
	if (!event.srcElement.classList.contains('food_background')) return;
	document.querySelector(".food_content").classList.remove(...['animated', 'slideInRight']);
	document.querySelector(".food_content").classList.add(...['animated', 'slideOutRight']);
	document.querySelector("body").removeAttribute("style");
	setTimeout(function() {
		document.querySelector(".food_background").remove();
	}, 1000);
}

export { Header, HeaderEvent }