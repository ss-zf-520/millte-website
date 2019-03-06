$(function() {
	//验证用户名
	$(".nameer").change(function() {
		var user01 = $(this).val();
		var reg = /^\w{4,10}/;
		if(user01 == 0) {
			$(".deng-tip1").html("账号不可以为空!");
		} else if(!reg.test(user01)) {
			$(".deng-tip1").html("请输入4-10个字母开头、数字、下划线").css({
				"color": "#f00"
			});
			return false;
		} else {
			$(".deng-tip1").html("");
		}

		$.get("http://47.104.244.134:8080/username.do", {
			"username": $(".nameer").val()
		}, function(data) {

			if(data.code == 0) {
				$(".deng-tip1").html("用户名为空或者已经被他人占用！").css({
					"color": "#f00"
				});
			} else {
				$(".deng-tip1").html("用户名可用！");
			}
		});
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

		//验证邮箱
		$("#emal").change(function() {
			var emal01 = $(this).val();
			var reg = /^\w+@\w+(\.\w+)+$/;
			if(emal01 == 0) {
				$(".deng-tip3").html("邮箱不可以为空!").css({
					"color": "#f00"
				});
			} else if(!reg.test(emal01)) {
				$(".deng-tip3").html("请输入：如jhon@163.com").css({
					"color": "#f00"
				});
				return false;
			} else {
				$(".deng-tip3").html("");
			};

		});
		//验证电话号码
		$("#tel").change(function() {
			var telVal = $(this).val();
			var reg = /^1(3|5|7|8)\d{9}$/g;
			if(telVal == 0) {
				$(".deng-tip4").html("电话不可以为空!").css({
					"color": "#f00"
				});
			} else if(!reg.test(telVal)) {
				$(".deng-tip4").html("请输入：如13852365412").css({
					"color": "#f00"
				});
				return false;
			} else {
				$(".deng-tip4").html("");
			}
		});

		//注册验证
		$("#btn").on('click', function() {
			$.post("http://47.104.244.134:8080/usersave.do", {
				"username": $(".nameer").val(),
				"password": $("#pwd").val(),
				"email": $("#emal").val(),
				"sex": "男"
			}, function(data) {
				console.log(data)
				if(data.code == 1) {
					$(".deng-tip5").html("用户名为空或者已经被他人占用！").css({
						"color": "#f00"
					});
				} else {
					$(".deng-tip5").html("注册成功,<a href='//www.mi.com/index.html'>3秒</a>后跳转页面！");
					var t = setTimeout(function() {
						$(location).attr("href", "index.html");
					}, 3000);
				}
			});

		});

	});
});