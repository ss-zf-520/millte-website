//滑动效果
$(function() {
	$("#cart-all").mouseenter(function() {
		$("#site-cartAll").show();
	});
	$("#cartList").mouseleave(function() {
		$("#site-cartAll").hide();
	});

	//获取商品的列表
	$.get("http://47.104.244.134:8080/goodsbytid.do", {
		tid: 13,
		page: 1,
		limit: 25
	}, function(data) {

		var shuju = data.data;
		console.log(shuju)
		var str = "";
		for(var i = 0; i < shuju.length; i++) {
			str +=
				`
			<li class="recommend-list">
			<dl>
			<dt><img src="${shuju[i].picurl}" data-id="${shuju[i].id}"></dt>
			<dd class="info">${shuju[i].info}</dd>
			<dd class="name">${shuju[i].name}</dd>
			<dd class="price">${shuju[i].price}</dd>
			</dl>
			<a class="addCart" id="btn" shuju-id="${shuju[i].id}">加入购物车</a>
			</li>
				`;
		};
		$(".showCarts").html(str);

		$('.addCart').mouseenter(function() {
			$(this).css({
				"background": "#ff6700",
				"color": "#fff"
			});
		});
		$('.addCart').mouseleave(function() {
			$(this).css({
				"background": "#fff",
				"color": "#ff6700"
			});
		});

		//添加购物车

		if($.cookie("cart")) {
			var obj = JSON.parse($.cookie("cart"));
			var num = 0;
			for(var i in obj) {
				num += obj[i];

				console.log(obj[i], num)
			}
			$(".container-cart-num").html(num);
		} else {
			var obj = {};
		}

		for(var i = 0; i < $(".addCart").length; i++) {
			$(".addCart").eq(i).on("click", function() {
				var id = this.getAttribute("shuju-id");

				console.log(id, shuju[id])
				var token = $.cookie("token");
				$.get("http://47.104.244.134:8080/cartsave.do", {
					gid: id,
					token: token
				}, function(data) {
					if(obj[id] == undefined) {
						obj[id] = 1;
					} else {
						obj[id]++;
					}
					var num = 0;
					for(var i in obj) {
						num += obj[i];
						//console.log(obj[i])
					}
					$(".container-cart-num").html(num);

				});

			});

		}
		//点击列表单个商品，进入详情页
		for(var i = 0; i < $(".recommend-list dl dt img").length; i++) {
			$(".recommend-list dl dt img").eq(i).click(function() {
				var id = $(this).attr("data-id");
				console.log(id)
				location.href = "xiangqing.html?id=" + id;
			});
		}

	});
	//登录显示
	$(".username").html($.cookie("username")).css({
		"color": "#ff6902"
	});

});