$(function(){

	//==============================================
	//  parcentage animation init
	//==============================================

	odometerOptions = { theme: 'default', duration: 10000 };

	//==============================================
	//  DOM
	//==============================================

	var
	$range1 = $('#range1'),
	$range2 = $('#range2'),
	$forcast1 = $('#forcast1'),
	$forcast2 = $('#forcast2'),
	$rate_number1 = $('#rate_number1'),
	$rate_number2 = $('#rate_number2'),
	$btn = $('.btn'),
	$btnFlash = $('.btn .flash'),
	$odometer = $('.odometer'),
	$rateText = $('#rate_text'),
	$rate = $('.rate'),
	$graph = $('.graph'),
	$forcastBar = $('.forcast_bar'),
	$resultIcon1_1 = $('#graph1 #result_icon1'),
	$resultIcon1_2 = $('#graph1 #result_icon2'),
	$resultIcon2_1 = $('#graph2 #result_icon1'),
	$drum1 = $('#rate1 .odometer'),
	$drum2 = $('#rate2 .odometer');

	//==============================================
	//  touch and rate refresh
	//==============================================

	var GRAPH_WIDTH = 558;
	$forcast1.on('touchmove', function(e) {
		var touch = e.originalEvent.touches[0];
		var offsetLeft = touch.pageX - 198;
		if (offsetLeft <= 0) {
			offsetLeft = 0;
		};
		if (offsetLeft >= GRAPH_WIDTH) {
			offsetLeft = GRAPH_WIDTH;
		};
		var offsetPercentage = offsetLeft / GRAPH_WIDTH * 100;
		updateForcast(offsetLeft, $forcast1);
		updatePercentage(offsetPercentage, $rate_number1);
	});

	var inputEndTimer = false;
	$forcast2.on('touchmove', function(e) {
		var touch = e.originalEvent.touches[0];
		var offsetLeft = touch.pageX - 198;
		if (offsetLeft <= 0) {
			offsetLeft = 0;
		};
		if (offsetLeft >= GRAPH_WIDTH) {
			offsetLeft = GRAPH_WIDTH;
		};
		var offsetPercentage = offsetLeft / GRAPH_WIDTH * 100;
		updateForcast(offsetLeft, $forcast2);
		updatePercentage(offsetPercentage, $rate_number2);

		if (inputEndTimer !== false) {
			clearTimeout(inputEndTimer);
		}
		inputEndTimer = setTimeout(function() {
			btnFade();
		}, 1000);
	});

	var forcastEditable = true;
	function updateForcast(val, dom){
		if (forcastEditable) {
			var fps = 60;
			setTimeout(drowForcast(val, dom), 1 / fps);
		};
	}

	function drowForcast(widthParcentage, dom){
		var refrasedWidth = widthParcentage;
		dom.css('width', refrasedWidth);
	}

	function updatePercentage(val, dom){
		if (forcastEditable) {
			dom.text(Math.floor(val));
		};
	}

	function btnFade(){
		$btn.find('.disabled').fadeOut(200);
		$btnFlash.addClass('flashing');
		$btn.find('.abled').fadeIn(200);
		btnClickable = true;
		forcastEditable = false;
	}

	var iconTimeline1 = [
		{animation:iconAnim1_1, interval:400},
		{animation:iconAnim1_2, interval:500},
		{animation:iconAnim1_3, interval:500},
	];

	var iconTimeline2 = [
		{animation:iconAnim2_1, interval:500},
		{animation:iconAnim2_2, interval:500},
	];

	var
	btnClickable = false,
	btn1Abled = true,
	btn2Abled = true;
	$btn.click(function(e) {
		if (btnClickable) {
			$(this).find('.abled').fadeOut(200);
			$(this).find('.disabled').fadeIn(200);
			$odometer.addClass('answer');
			var btnIndex = $btn.index(this) + 1;
			$rateTarget = $('#answer' + btnIndex);
			$percentageTarget = $('#rate_number' + btnIndex);
			if (btnIndex === 1 && btn1Abled) {
				showGraph($rateTarget);
				showRate($percentageTarget);
				main_animation(iconTimeline1, 1650);
				btn1Abled = false;
			}else if(btnIndex === 2 && btn2Abled){
				showGraph($rateTarget);
				showRate($percentageTarget);
				main_animation(iconTimeline2, 2000);
				btn2Abled = false;
			};
		};
	});

	function showGraph(targetElm){
		targetElm.velocity({
			width: GRAPH_WIDTH * ((targetElm.data('answer') + 30) / 100)
		},3000);
	}

	function showRate(targetElm){
		$odometer.removeClass('odometer');
		targetElm.text('0');
		$odometer.addClass('odometer');
		targetElm.text(targetElm.data('answer'));
	}

	function iconAnim1_1(){
		$resultIcon1_1.addClass('flash');
	}

	function iconAnim1_2(){
		$resultIcon1_2.addClass('flash');
	}

	function iconAnim1_3(){
		$drum1.addClass('flash');
	}

	function iconAnim2_1(){
		$resultIcon2_1.addClass('flash');
	}

	function iconAnim2_2(){
		$drum2.addClass('flash');
	}

	//==============================================
	//  Onload Animation
	//==============================================

	var timeline = [
		{animation:anim1, interval:500},
		{animation:anim2, interval:500},
		{animation:anim3, interval:500},
	];

	function main_animation (timeline, firstInterval) {

		// 最初のアニメーションが始まるまでの時間
		var interval_sum = firstInterval;

		// アニメーションを上から順に実行していく
		var len = timeline.length;
		for(var i=0; i<len; i++){
			setTimeout(timeline[i].animation, interval_sum);
			interval_sum += timeline[i].interval;
		}
	}
	main_animation(timeline, 300);


	//==============================================
	//	Define Animation
	//==============================================

	function anim1 () {
		$graph.velocity({
			width: '558px'
		});
		$rateText.velocity({
			right: '0'
		},500);
	}

	function anim2(){
		$rate.velocity({
			right: '0'
		},500);
		$forcastBar.velocity({
			width: '27px'
		},500);
	}

	function anim3(){
		$forcastBar.addClass('flash');
	}


}); // end of anonymous function
