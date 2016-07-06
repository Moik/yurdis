$(function() {

	$(".slider-wrap, .top-panel").slideDown();

	$('.service-item h4').equalHeights();
	$('.news-item-text').equalHeights();
	$('.link-item').equalHeights();

	//Menu
	$(".mobile-menu").click(function() {
		$(this).find('.toggle-mnu').toggleClass("on");
		// $("#mm-main-menu").slideToggle();
		return false;
	});	

	$('#main-menu').mmenu({
		extensions : [ 'widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black' ],
		navbar: {
			title: "Мобильное Меню"
		}
	}, {
		clone: true
	});

	$("#mm-main-menu").removeClass("top-line").find("ul").removeClass("sf-menu");
	$("#mm-main-menu *").removeClass("container");

	var mmAPI = $("#mm-main-menu").data( "mmenu" );

	mmAPI.bind("closed", function() {
		$('.toggle-mnu').removeClass('on');
	});

	$(".mobile-menu").click(function() {
		mmAPI.open();
	});

	$('.top-line .sf-menu').superfish({
		cssArrows: false,
		hoverClass: false,
		delay: 200
	});
	
	//Slider
	var owl = $(".slider");

	owl.owlCarousel({
		loop: true,
		items: 1,
		itemClass: "slide-wrap",
		nav: true,
		navContainer: ".slider-nav",
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
	});

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$(".callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$('.success').addClass('visible');
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
				$('.success').removeClass('visible');
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});


	//Popup windows
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});

	$('a[href=#callback]').click(function() {
		var dform = $(this).data('form');
		$('#callback .form-name').val(dform);
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});
