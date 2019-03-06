$(function() {
	//获取商品详情，需在搜索栏取到商品的id
	var id = location.search.split("=")[1];
	$.get("http://47.104.244.134:8080/goodsbyid.do", {
		id: id
	}, function(data) {
		console.log(data)
		var str = `
		<div id="detailImg" class="img-con" style=" margin-top: 0px;">
			<img src="${data.picurl}" width="500" height="500"/>
		</div>
		<div id="J_text">
			<h1 class="datail-title">${data.name}</h1>
			<p class="sale01">${data.info}</p>
			<p class="sale-desc" id="J_desc"><span>上架时间:</span>${data.pubdate}</p>
			<span>单价:</span><span class="price01">${data.price} </span>元
			<a  class="btn" data-id="${data.id}">加入购物车</a>
		</div>`
		$(".carts-detail").html(str);
		//添加购物车，需要将登录时存到cookie中的token值取到
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

		$(".btn").click(function() {
			var id = this.getAttribute("data-id");
			var token = $.cookie("token");
			$.get("http://47.104.244.134:8080/cartsave.do", {
				gid: id,
				token: token
			}, function(data) {
				console.log(data.msg)
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
	})
	//登录显示
	$(".username").html($.cookie("username")).css({
		"color": "#ff6902"
	});

});