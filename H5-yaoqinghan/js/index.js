var ii = 0;
$(function() {

	(function() {
		$(".content").on("touchmove", function() {
			event.preventDefault();
		});

		var timer = null;

		// con3
		for (var i = 0; i < $(".content .conBox .con3").find(".text02 ul li").length; i++) {
			$(".content .conBox .con3").find(".text02 ul li").eq(i).css({
				"-webkit-animation-delay": 3.5 + i * 0.2 + 's'
			})
		};

		// 上下滑动
		function startAni(onOff) {
			$(".content .conBox .con .box .jsonBox").removeClass("action")

			clearTimeout(timer);

			if (onOff) {
				// 往上滑 true
				$(".start").removeClass("action up down").addClass("up");
			} else {
				// 往下滑 false
				$(".start").removeClass("action up down").addClass("down");
			};

			$(".content .conBox .con").removeClass("action");

			timer = setTimeout(function() {
				$(".start").addClass("action");
				$(".content .conBox .con").eq(ii).addClass("action");
			}, 16);

		}

		// textarea 阻止冒泡
		$("#sub").on("click", function() {
			var Input = $(".content .conBox .conForm input");
			if (Input.eq(0).val() == '') {
				alert("请填写联系人");
				Input.eq(0).focus();

			} else if (Input.eq(1).val() == '') {
				alert("请填写联系电话");
				Input.eq(1).focus();
			} else {
				var data = {
					'pid': pid,
					'edition': edition,
					'name': Input.eq(0).val(),
					'tel': Input.eq(1).val(),
					'text': $("#text").val()
				};

				$.get(url, data, function(data) {
					if (data == 1) {
						alert('提交成功');
						Input.eq(0).val('');
						Input.eq(1).val('');
						$("#text").val('');
					} else {
						alert('提交失败');
					}
				})
			}
		})

		$(".content .conBox .conForm form textarea").on("touchmove", function() {
			event.stopPropagation()
		})

		// 向下滑动
		$(".content").on("swipeDown", function() {
			ii--;
			ii < 0 ? (ii = 0) : startAni(false);
		})

		// 向上滑动
		$(".content").on("swipeUp", function() {
			ii++;
			var k = $(".content .conBox .con").length - 1;
			ii > k ? ii = k : startAni(true);
		});

	})();
});

// 设置字体大小
(function() {
	function setFontSize() {
		var oWidth = document.documentElement.clientWidth;
		if (oWidth <= 768) {
			document.documentElement.style.fontSize = Math.round(oWidth / 6.4) + 'px';
		}
	}
	setFontSize();
	$(window).on("resize", setFontSize);
})();

// 兼容音乐
$(window).on('load', function() {
	$(".start").addClass("action");
	$(".content .conBox .con").eq(ii).addClass("action");
	// 背景音乐
	(function() {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

		if (isiOS) {
			autoPlayAudio()
		} else {
			AndFn()
		}

		function pausedFn(obj) {
			$("#music").on('touchstart', function() {
				if (obj.paused) {
					obj.play();
					$("#music").css({
						"-webkit-animation-play-state": "running"
					});
				} else {
					obj.pause()
					$("#music").css({
						"-webkit-animation-play-state": "paused"
					});
				}
			});
		}

		function AndFn() {
			setTimeout(function() {
				$("#music").fadeIn(1000);
				var audio = document.getElementById("ms");

				audio.play();
				document.addEventListener("WeixinJSBridgeReady", function() {
					audio.play();
				}, false);
				pausedFn(audio)
			}, 2000)
		}

		function autoPlayAudio() {
			setTimeout(function() {
				$("#music").fadeIn(1000);
				wx.config({
					// 配置信息, 即使不正确也能使用 wx.ready
					debug: false,
					appId: '',
					timestamp: 1,
					nonceStr: '',
					signature: '',
					jsApiList: []
				});
				wx.ready(function() {
					var audio = document.getElementById("ms");
					audio.play();
					pausedFn(audio)
				});
			}, 2000)
		};
	})();
})