var ii = 0;
var path = location.host;
var pid = 4;
var edition = 1;

var url = "http://" + path + '/index/index/doadd';
$(function() {

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

$(window).on('load', function() {
	$(".start").addClass("action");
	$(".content .conBox .con").eq(ii).addClass("action");
	// 背景音乐
	(function() {
		setTimeout(function() {
			$("#music").fadeIn(1000);
			var audio = document.getElementById("ms");

			audio.play();
			document.addEventListener("WeixinJSBridgeReady", function() {
				audio.play();
			}, false);
			document.addEventListener('YixinJSBridgeReady', function() {
				audio.play();
			}, false);

			$("#music").on('tap', function() {
				if (audio.paused) {
					audio.play();
					$("#music").css({
						"-webkit-animation-play-state": "running"
					});
				} else {
					audio.pause()
					$("#music").css({
						"-webkit-animation-play-state": "paused"
					});
				}
			});
		}, 2000)
	})();
})