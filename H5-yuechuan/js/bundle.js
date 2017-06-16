(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;
				if (!u && a) return a(o, !0);
				if (i) return i(o, !0);
				var f = new Error("Cannot find module '" + o + "'");
				throw f.code = "MODULE_NOT_FOUND", f
			}
			var l = n[o] = {
				exports: {}
			};
			t[o][0].call(l.exports, function(e) {
				var n = t[o][1][e];
				return s(n ? n : e)
			}, l, l.exports, e, t, n, r)
		}
		return n[o].exports
	}
	var i = typeof require == "function" && require;
	for (var o = 0; o < r.length; o++) s(r[o]);
	return s
})({
	1: [function(require, module, exports) {
		"use strict";
		var ii = 0,
			path = location.host,
			pid = 4,
			edition = 1,
			url = "http://" + path + "/index/index/doadd";
		$(".start").addClass("action"), $(".content .conBox .con").eq(ii).addClass("action"), $(function() {
			! function() {
				function n() {
					var n = document.documentElement.clientWidth;
					n <= 768 && (document.documentElement.style.fontSize = Math.round(n / 6.4) + "px")
				}
				n(), $(window).on("resize", n)
			}(),
			function() {
				function n(n) {
					n.addClass("active"), setTimeout(function() {
						n.removeClass("active")
					}, 300)
				}

				function t(n) {
					$("textarea").blur(), $("input").blur(), clearTimeout(o), n ? $(".start").removeClass("action up down").addClass("up") : $(".start").removeClass("action up down").addClass("down"), $(".content .conBox .con").removeClass("action"), o = setTimeout(function() {
						$(".start").addClass("action"), $(".content .conBox .con").eq(ii).addClass("action")
					}, 16)
				}
				$(".content").on("touchmove", function() {
					event.preventDefault()
				});
				var o = null,
					e = $(".conBox .oTs.o2 .point .ani .show .p2p div"),
					i = 0;
				setInterval(function() {
					++i > e.length - 1 && (i = 0), n(e.eq(i))
				}, 1e3);
				for (var a = $(".conBox .onePlus .txtBoxA .ani .show ul li"), c = 0; c < a.length; c++) a.eq(c).css({
					"-webkit-animation-delay": 2.3 + .2 * c + "s"
				});
				$("#sub").on("click", function() {
					var n = $(".content .conBox .conForm input");
					if ("" == n.eq(0).val()) alert("请填写联系人"), n.eq(0).focus();
					else if ("" == n.eq(1).val()) alert("请填写联系电话"), n.eq(1).focus();
					else {
						var t = {
							pid: pid,
							edition: edition,
							name: n.eq(0).val(),
							tel: n.eq(1).val(),
							text: $("#text").val()
						};
						$.get(url, t, function(t) {
							1 == t ? (alert("提交成功"), n.eq(0).val(""), n.eq(1).val(""), $("#text").val("")) : alert("提交失败")
						})
					}
				}), $(".content .conBox .conForm form textarea").on("touchmove", function() {
					event.stopPropagation()
				}), $(".content").on("swipeDown", function() {
					--ii < 0 ? ii = 0 : t(!1)
				}), $(".content").on("swipeUp", function() {
					ii++;
					var n = $(".content .conBox .con").length - 1;
					ii > n ? ii = n : t(!0)
				})
			}()
		}), $(window).on("load", function() {
			function n(n) {
				$("#music").on("touchstart", function() {
					n.paused ? (n.play(), $("#music").css({
						"-webkit-animation-play-state": "running"
					})) : (n.pause(), $("#music").css({
						"-webkit-animation-play-state": "paused"
					}))
				})
			}

			function t(n) {
				$("#music").on("touchstart", function() {
					n.paused ? (n.play(), $("#music").css({
						"-webkit-animation-name": "aniMusic"
					})) : (n.pause(), $("#music").css({
						"-webkit-animation-name": "aniMusi"
					}))
				})
			}
			var o = navigator.userAgent;
			o.indexOf("Android") > -1 || o.indexOf("Adr");
			!!o.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? function() {
				setTimeout(function() {
					$("#music").fadeIn(1e3), wx.config({
						debug: !1,
						appId: "",
						timestamp: 1,
						nonceStr: "",
						signature: "",
						jsApiList: []
					}), wx.ready(function() {
						var n = document.getElementById("ms");
						n.play(), t(n)
					})
				}, 2e3)
			}() : ($("textarea").focus(function() {
				var n = 100 - $(this).offset().top;
				$(".conForm form").css({
					"-webkit-transform": "translateY(" + n + "px)"
				}), $(".conForm .bSlide").css({
					opacity: 0
				})
			}), $("textarea").blur(function() {
				$(".conForm form").css({
					"-webkit-transform": "translateY(0px)"
				}), $(".conForm .bSlide").css({
					opacity: 1
				})
			}), $("form input").focus(function() {
				$(".conForm .bSlide").css({
					opacity: 0
				})
			}), $("form input").blur(function() {
				$(".conForm .bSlide").css({
					opacity: 1
				})
			}), function() {
				setTimeout(function() {
					$("#music").fadeIn(1e3);
					var t = document.getElementById("ms");
					t.play(), document.addEventListener("WeixinJSBridgeReady", function() {
						t.play()
					}, !1), n(t)
				}, 2e3)
			}())
		});
	}, {}]
}, {}, [1]);