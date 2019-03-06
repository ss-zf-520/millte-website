$(function() {
	$.get("http://47.104.244.134:8080/cartlist.do", {
		token: $.cookie("token")
	}, function(data) {

		var str = "";
		for(var i = 0; i < data.length; i++) {
			str += `<ul class="list-head cartAll-list" id="cartAll-list"  data-id="${data[i].id}" data-gid="${data[i].gid}">
			
			<li class="quanxuan">
				<input type="checkbox" class="iconfont icon-checkbox selectonly" id="select-all"></input>
			</li>
			<li class="cart-img"><img src="${data[i].goods.picurl}"  id="cartImg"></li>
			<li class="cart-name">
				<h3 class="detail-name"><a href="#">${data[i].goods.name}</a></h3>
			</li>
			<li class="cart-price">${data[i].goods.price}</li>
			<li class="cart-num">
			<span class='minus'>-</span>
				<b>${data[i].count}</b>
			<span class='plus'>+</span>
			</li>
			<li class="cart-total"  id="cart-total01">${data[i].count*data[i].goods.price}</li>
			<li class="cart-action">删除</li>
			</ul>`
		}
		$(".itemTable").html(str);
		//全选
		$("#select-all").on("click", function() {
			if(this.checked == true) {
				$(".selectonly").prop("checked", true);
			} else {
				$(".selectonly").prop("checked", false);
			}
			showTotal();
		});
		//单选
		for(var i = 0; i < $(".selectonly").length; i++) {
			$(".selectonly").eq(i).on("click", function() {
				$(this).css({
					"background": "#ff6b01"
				});
				showTotal();
			});
		}

		//计算
		function showTotal() {
			var sum = 0;
			$("input:checked").parent().siblings("#cart-total01").each(function() {
				sum += parseInt($(this).html());
			});
			$(".total-price .prices").html(sum)
		};

		//点击 - 增加数量
		$(".minus").on("click", function() {
			var num = $(this).next().html();
			$(this).next().html(--num);
			//获取单价
			var price = $(this).parent().prev().html();
			//获取总价
			$(this).parent().next().text(price * num);
			var _this = $(this);
			$.get("http://47.104.244.134:8080/cartupdate.do", {
				id: _this.closest("ul").attr("data-id"),
				gid: _this.closest("ul").attr("data-gid"),
				token: $.cookie("token"),
				num: -1
			});

			showTotal();
			//console.log(_this.closest("div"))
			if(num == 0) {
				console.log("aa")
				$.get("http://47.104.244.134:8080/cartupdate.do", {
					id: _this.closest("ul").attr("data-id"),
					gid: _this.closest("ul").attr("data-gid"),
					token: $.cookie("token"),
					num: 0
				});
				_this.closest("div").remove()
			}
		});
		//点击  + 减少数量
		$(".plus").on("click", function() {
			var num = $(this).prev().html();
			$(this).prev().html(++num);
			//获取单价
			var price = $(this).parent().prev().html();
			//获取总价
			$(this).parent().next().text(price * num);
			var _this = $(this);
			$.get("http://47.104.244.134:8080/cartupdate.do", {
				id: _this.closest("ul").attr("data-id"),
				gid: _this.closest("ul").attr("data-gid"),
				token: $.cookie("token"),
				num: +1
			});
			showTotal();
		});
		//点击 删除商品
		$(".cart-action").on("click", function() {
			var _this = $(this);
			$.get("http://47.104.244.134:8080/cartupdate.do", {
				id: _this.parent().attr("data-id"),
				gid: _this.parent().attr("data-gid"),
				token: $.cookie("token"),
				num: 0
			})
			if(window.confirm('确定要删除该项吗?')) {
				$(this).parent().remove();
				showTotal();
			}

		})

	});

	//登录显示
	$(".username").html($.cookie("username")).css({
		"color": "#ff6902"
	});

	$(".exit").click(function() {
		$.cookie("username", "登录");
		$(location).attr("href", "cart.html");
	});

});