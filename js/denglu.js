$(function() {
	//验证用户名
	$("#username").change(function() {
		var user01 = $(this).val();
		var reg = /^\w{4,10}/;
		if(user01 == 0) {
			$(".deng-tip1").html("账号不可以为空!").css({
				"color": "#f00"
			});
		} else if(!reg.test(user01)) {
			$(".deng-tip1").html("请输入4-10个字母开头、数字、下划线").css({
				"color": "#f00"
			});
			return false;
		} else {
			$(".deng-tip1").html("");
		}
	});
	//验证密码格式
	$("#pwd").change(function() {
		var pwd01 = $(this).val();
		var reg = /^\w{6,20}$/;
		if(pwd01 == 0) {
			$(".deng-tip2").html("密码不可以为空!").css({
				"color": "#f00"
			});
		} else if(!reg.test(pwd01)) {
			$(".deng-tip2").html("请输入6-20个字母、数字、下划线").css({
				"color": "#f00"
			});
			return false;
		} else {
			$(".deng-tip2").html("");
		}
	});
	//登录验证
	$("#btn").on("click", function() {
		$.post("http://47.104.244.134:8080/userlogin.do", {
			"name": $("#username").val(),
			"password": $("#pwd").val()
		}, function(data) {
			console.log(data);
			if(data.code == 0) {
				//将返回的token值存到cookie中，购物车中需要传此参数
				$.cookie("token", data.data.token);
				$.cookie("username", $("#username").val());
				$.cookie("password", $("#pwd").val());
				$.cookie("register", "已登录");
				$(".deng-tip5").html("登录成功,<a id='timeOut' href='index.html' style='color:blue;'>3秒</a>后跳转页面！");
				var t = setTimeout(function() {
					$(location).attr("href", "index.html");
				}, 3000);
			} else {
				$(".deng-tip5").html("用户名不存在！").css({
					"color": "#999"
				});
			}
		});

	});
	$("#nav01").on("click", function() {
		$(this).css({
			"color": "#FF6B01"
		}).siblings().next().css({
			"color": "#666"
		});
		$(".erweima").stop().hide().siblings().find(".login-area").stop().show();
	});
	$("#nav02").on("click", function() {
		$(this).css({
			"color": "#FF6B01"
		}).siblings().prev().css({
			"color": "#666"
		});
		$(".erweima").stop().show().siblings().find(".login-area").stop().hide();
	});

});