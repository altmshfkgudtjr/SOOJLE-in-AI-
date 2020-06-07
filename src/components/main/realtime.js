const Realtime = ()=> {
	let view = `
	<div class="realtime_box">
		<div class="realtime_title noselect"><i class="fas fa-chart-line"></i> 실시간 검색어</div>
		<div class="realtime_cont">
			<i class="fa fa-chevron-down menu_realtime_hover"></i>
		</div>
	</div>
	`;

	return view;
}

const RealtimeEvent = ()=> {

}

export { Realtime, RealtimeEvent }