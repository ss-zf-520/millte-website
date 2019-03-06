$(function() {
	//购物车下拉
	$(".container-cart").has("a").hover(function() {
		$(".cart-menu").stop().slideToggle(100);
	})
	//search
	$(".icon-fangdajing").mouseenter(function() {
		$(this).css({
			"background": "#ff6902",
			"color": "#fff"
		});
	});
	$(".icon-fangdajing").mouseleave(function() {
		$(this).css({
			"background": "#fff",
			"color": "#333"
		});
	});
	//nav
	$(".nav-list .nav-item").hover(function() {
		$(this).find(".itemChild").addClass("items")
			.stop().slideToggle(300).siblings()
			.find(".itemChild").removeClass("items");
	});
	//轮播图
	var count = 0;
	var timer = setInterval(function() {
		count++;
		if(count == $(".xm-slider-list li").length) {
			count = 0;
		};
		$(".xm-slider-list li").eq(count).fadeIn().siblings().fadeOut();
		$(".slider-nav-list li").eq(count).addClass("select").siblings().removeClass("select");
	}, 3000);
	//角标转换图片
	$(".slider-nav-list li").hover(function() {
		//clearInterval(timer);
		var count1 = $(this).index();
		$(".slider-nav-list li").eq(count1).addClass("select").siblings().removeClass("select");
		$(".xm-slider-list li").eq(count1).fadeIn().siblings().fadeOut();
	}, function() {

	});

	//left按钮
	$(".next").click(function() {
		count++;
		if(count == $(".xm-slider-list li").length) {
			count = 0;
		}
		$(".slider-nav-list li").eq(count).addClass("select").siblings().removeClass("select");
		$(".xm-slider-list li").eq(count).fadeIn(1000).siblings().fadeOut(1000);
	});

	//right按钮
	$(".prev").click(function() {
		count--;
		if(count == -1) {
			count = $(".xm-slider-list li").length - 1;
		}
		$(".slider-nav-list li").eq(count).addClass("select").siblings().removeClass("select");
		$(".xm-slider-list li").eq(count).fadeIn(1000).siblings().fadeOut(1000);
	});

	//显隐back-top按钮
	$(window).scroll(function() {
		var top = $(window).scrollTop();
		if(top >= 1800) {
			$(".backtop-bar").show();
		} else if(top < 600) {
			$(".backtop-bar").hide();
		}
		//点击回到顶部
		$(".backtop-bar").click(function() {
			$("html, body").stop().animate({
				scrollTop: 0
			}, 40);
		});
	});
	//显隐手机app二维码
	$(".barTop .teshu").mouseenter(function() {
		$(".downloadBar").show();
	});
	$(".barTop .teshu").mouseleave(function() {
		$(".downloadBar").hide();
	});
	//加阴影
	$(".phone-show img,.sLists,.brick-l li,.elecList li,.tuijian-li,.hot-tips .hotList li,.contentList .books,.video-item").mouseenter(function() {
		$(this).addClass("showActive");
	});
	$(".phone-show img,.sLists,.brick-l li,.elecList li,.tuijian-li,.hot-tips .hotList li,.contentList .books,.video-item").mouseleave(function() {
		$(this).removeClass("showActive");
	});
	//评价鼠标经过滑出
	//鼠标进入
	$(".elecList li").mouseenter(function() {
		$(this).find(".review").addClass("shower")
			.end().siblings().find(".review").removeClass("shower");
	});
	//鼠标离开
	$(".elecList li").mouseleave(function() {
		$(this).find(".review").removeClass("shower");
	});
	//层级菜单
	$(".category-lists .colList").mouseenter(function() {
		$(this).addClass("cols").siblings().removeClass("cols");
		$(".col-01").stop().show("fast");
	});
	$(".category-lists .colList").mouseleave(function() {
		$(this).removeClass("cols");
		$(".col-01").stop().hide("fast");
	});

	//家电
	$(".brick-nav li").mouseenter(function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	$(".brick-nav").hover(function() {
		$(".elecList ").fadeToggle(100);
	});
	//推荐按钮< >
	//左按钮
	var index = 0;
	var len = $(".tuijian-li").length - 15;
	$(".brick-nav1 .l-btn").click(function() {
		if(index < 1) {
			return;
		}
		index--;
		len++;
		$(".tuijian-mean").animate({
			"margin-left": "+=1240px"
		}, 500);
	});
	//右按钮
	$(".brick-nav1 .r-btn").click(function() {
		if(len == -2) {
			return;
		}
		index++;
		len--;
		$(".tuijian-mean").animate({
			"margin-left": "-=1240px"
		}, 500);
	});

	//内容
	$(".book-item").mouseenter(function() {
		$(this).find(".xm-btn a").show("slow");
	});
	$(".book-item").mouseleave(function() {
		$(this).find(".xm-btn a").hide("fast");
	});
	//当点击左按钮
	var num = 0;
	var lenths = $(".books").length - 3;
	$(".prev").click(function() {
		return false;
		if(num < 1) {
			return;
		}
		num--;
		lenths++;
		$(".book-item").animate({
			"margin-left": "+=296px"
		}, 500);
	});
	//当点击右按钮
	$(".next").click(function() {
		return false;
		if(lengths == -2) {
			return;
		}
		console.log(lenths)
		num++;
		lengths--;
		$(".book-item").animate({
			"margin-left": "-=309px"
		}, 500);
	});

	//登录显示

	$("#username").html($.cookie("username")).css({
		"color": "#ff6902"
	});
	$(".username").html("登录");

	//在首页显示购物车数据
	$.get("http://47.104.244.134:8080/cartlist.do", {
		token: $.cookie("token")
	}, function(data) {

		var str = "";
		for(var i = 0; i < data.length; i++) {
			str += `<ul class="list-head cartAll-list" id="cartAll-list"  data-id="${data[i].id}" data-gid="${data[i].gid}">
				<li class="show01"><img src="${data[i].goods.picurl}"/></li>
				<li class="show02">${data[i].goods.name}</li>
				<li class="show03"><span>价格:</span>${data[i].count}<span>X</span>${data[i].goods.price}</li>
			</ul>`
		}
		$(".container-cart .cart-menu .loader").html(str);

	});

});